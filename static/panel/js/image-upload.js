var config = {
    "uptoken_url": "/api/imageupload/token?protocol=json&bucket=mzimg",
    "domain": "img.static.mzapp.info"
};
var upTarget = {
    "target": null,
    "serial": null
};

$(function () {
    var upload = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'uploadBtn',
        container: 'image-selector',
        max_file_size: '100mb',
        flash_swf_url: 'plupload/Moxie.swf',
        max_retries: 3,
        chunk_size: '4mb',
        auto_start: false, // 自动上传
        dragdrop: false, // 拖拽上传
        drop_element: 'element', // 拖拽区域
        uptoken_url: config.uptoken_url,
        domain: config.domain,
        unique_names: true, // 自动重命名
        init: {
            // 现存已知bug: 2015年08月17日
            // 由于需要每次上传需要初始化上传对象,所以在获取key的时候选择文件会无效

            // 初始化上传操作
            // 选择图片以后
            'FilesAdded': function (up, files) {
                plupload.each(files, function (file) {
                    // 开始上传
                    var progress = 0; // 初始化进度条为0
                    setProgress(progress);
                    upload.start();
                });
            },
            // 每个文件上传前需要处理的任务
            'BeforeUpload': function (up, file) {
                // 关闭选择model
                $("#upload-status-label").html("上传中");
                $("#image-selector").modal('hide');
                $("#image-uploader").modal('setting', 'closable', false).modal('show');
            },
            'UploadProgress': function (up, file) {
                // 每个文件上传时,处理相关的事情
                // 打开 model 2,显示进度条
                //console.log(up);
                var progress = up.total.percent.toString();
                setProgress(progress);
            },
            'FileUploaded': function (up, file, info) {
                // 每个文件上次成功后需要处理的操作
                // 参数info包含两个参数: hash,key(文件名)
                // 关闭model2
                $("#upload-status-label").html("上传完成");
                //console.log(info);
                uploadSuccess($.parseJSON(info), upTarget.target, upTarget.serial);
            },
            'Error': function (up, err, errTip) {

            },
            'UploadComplete': function () {
            }
        }
    });
});


/**
 * 图片上传模型
 * @param target 需要上传的目标
 *
 * target 允许的参数:
 *
 *    1: 主图 serial: 空值
 *    2: 户型图片 serial: 户型序号
 *    3: 其他图片 serial: 图片序号
 */
function onUpload(target, serial) {
    $("#image-uploader").modal({allowMultiple: true});
    $("#image-selector").modal('show');
    // 初始化上传
    //console.log(target);
    upTarget.target = target;
    upTarget.serial = serial;
}

function setProgress(value) {
    $("#upload-bar").attr('data-percent', value);
    $("#upload-bar .bar").css('width', value + "%");
    $("#upload-progress").html(value + "%");
}

function uploadSuccess(info, target, serial) {
    var url = "http://" + config.domain + "/" + info.key;
    $("#image-uploader").modal('hide');
    switch (target) {
        case 1:
        {
            // 上传主图时
            $("#main-image img").attr('src', url);
            $("#main-image input").val(url);
            break;
        }
        case 2:
        {
            // 上传户型图片
            $('#unit_' + serial + " img").attr('src', url);
            break;
        }
        case 3:
        {
            // 上传其他图片
            $('#image_' + serial + " img").attr('src', url);
            break;
        }
        case 4:
        {
            // 编辑:上传主图
            onEditMainImageSave(url);
            break;
        }
        case 5:
        {
            // 编辑:上传户型图片
            $('.edit.units #unit_' + serial + " img").attr('src', url);
            break;
        }
        case 6:
        {
            // 编辑:上传其他图片
            onEditNewImageSave(url,serial);
            break;
        }
    }
}