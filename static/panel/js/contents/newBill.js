function onNewBillLoaded() {
    onNewBillCreate_BillTime();
    //onNewBillCreate_BillID();
    onMapLoaded();
    onOtherUILoading();
    onNewUnitClicked();
    onNewImageClicked();
}

function onNewBillCreate_BillTime() {
    var datetime = new Date();
    $("#bill_time span").text(
        datetime.getFullYear() + "-"
        + (datetime.getMonth() + 1) + "-"
        + datetime.getDate() + "   "
        + datetime.getHours() + ":"
        + datetime.getMinutes()
    );
}

function onNewBillCreate_BillID(district) {
    var billID;
    var req = $.ajax('http://api.panel.dev.mzapp.info/newbill/billid/', {
        method: "GET",
        data: {
            protocol: 'json',
            district: district
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        if (returnData.status == 'failed') {

            billID = "无法生成ID,请重试. ".returnData.error_info;

        }
        else {

            billID = returnData.data.bid;

        }
        $("#bill_id span").text(billID);
    });
}

function onOtherUILoading() {
    $('.ui.checkbox')
        .checkbox()
    ;
    $('select.dropdown')
        .dropdown()
    ;
}

function onNewBillClear() {
    // 一般情况下刷新页面就可以了
    location.href = location.origin + "/新建";
}

function onNewBillSave() {
    var data = new NewBillData();
    if (onNewBillCheck(data)) {
        // 发送数据
        onDataSend(data);
    }
}

function NewBillData() {
    this.id = $("#bill_id span").text();    // ID
    this.ctime = $("#bill_time span").text();   // 创建时间
    this.name = $("#basic input").val(); // 房源名称
    this.extract = {
        //this.type: $("#type select").val(); // 类型 暂时禁用
        metro: {
            "line_1": $($("#metro .checkbox")[0]).checkbox('is checked'),
            "line_2": $($("#metro .checkbox")[1]).checkbox('is checked'),
            "line_4": $($("#metro .checkbox")[2]).checkbox('is checked'),
            "line_5": $($("#metro .checkbox")[3]).checkbox('is checked'),
            "line_6": $($("#metro .checkbox")[4]).checkbox('is checked')
        }, // 地铁数据
        description: $("#description textarea").val() // 描述信息
    };
    this.address = {
        district: $("#district").val(),
        area: $("#area").val(),
        address: $("#add").val(),
        pos: {
            posx: $("#posx").val(),
            posy: $("#posy").val()
        }
    };
    this.units = {
        units_num: $("#units_num label span").text()[0],
        ulist: getUnits($("#units_num label span").text()[0])
    };
    this.images = {
        main: $("#main-image img").attr('src'),
        contents_num: $("#images_num label span").text()[0],
        contents: getImages($("#images_num label span").text()[0])
    };
}

function getUnits(num) {
    var data = {};
    for (i = 0; i < num; i++) {
        var unit = {
            name: $($('#unit_' + (i + 1)).children()[1].children[0].children[0].children[0]).children('input').val(),
            size: $($('#unit_' + (i + 1)).children()[1].children[0].children[0].children[1]).children('input').val(),
            price: $($('#unit_' + (i + 1)).children()[1].children[0].children[1].children[0]).children('input').val(),
            decoration: $($('#unit_' + (i + 1)).children()[1].children[0].children[1].children[1]).children('select').val(),
            image: $('#unit_' + (i + 1)).find('img').attr('src')
        };
        data[i] = unit;
    }
    return data;
}
function getImages(num) {
    var data = {};
    for (i = 0; i < num; i++) {
        var image = {
            name: $('#image_' + (i + 1) + ' input').val(),
            url: $('#image_' + (i + 1) + ' img').attr('src')
        };
        data[i] = image;
    }
    return data;
}

/**
 * 录入数据验证
 * 只对必要数据做验证
 *
 * 验证数据:
 *      ID
 *      名字
 *      地址: 区 商圈 地址 坐标
 *      大图
 */
function onNewBillCheck(data) {
    //console.log(data);
    if (data.name === "") {
        alert("请输入名称");
        return false;
    }
    //else if() {} // 判断是否已生成ID
    else if (data.address.district === "" || data.address.area === "" || data.address.address === "" || data.address.pos.posx === "" || data.address.pos.posy === "") {
        alert("请将地址分类下所有内容填写完整");
        return false;
    }
    else if (data.images.main === "http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png") {
        alert("房源大图不能使用默认");
        return false;
    }
    else {
        // 判断Unit Price/Size not null
        for (var i = 0; i < data.units.ulist.length; i++) {
            var unit = data.units.ulist[i];
            if(unit.size === ""){
                alert("第"+(i+1)+"个户型的面积不能为空");
                return false;
            }
            else if(unit.price === ""){
                alert("第"+(i+1)+"个户型的价格不能为空");
                return false;
            }
            else if(unit.decoration === ""){
                alert("必须为第"+(i+1)+"个户型选择一个装修类型");
                return false;
            }
            else {
                continue;
            }
            return true;
        }
        return true;
    }
}

function onDataSend(data) {
    var req = $.ajax("http://api.panel.dev.mzapp.info/newbill/create/?protocol=json", {
        method: "POST",
        data: {
            data: data
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        //console.log(returnData);
        if (returnData.status === "success") {
            alert("保存成功 现在你可以在 '房源管理' 中管理房源\n\n房源ID: " + returnData.data.bid + "\n房源名字: " + returnData.data.bname);
            location.href(location.origin + "/新建");
        }
        else {
            alert("保存失败\n\n错误: " + returnData.error_info);
        }
    })
}