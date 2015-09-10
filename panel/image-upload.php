<!--上传相关模块-->
<!--选择模态框-->
<div class="ui first copuled small modal" id="image-selector">
    <div class="header">
        选择图片
    </div>
    <div class="image content">
        <div class="ui medium image">
            <img src="http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png">
        </div>
        <div class="description">
            <div class="ui header">选择要上传的图片</div>
            <!--<p>上传会自动开始,完成后您将会在左边看到预览</p>-->
            <!--             Uploaf Form-->
        </div>
    </div>
    <div class="actions">
        <div class="ui buttons">
            <div class="ui black deny button">
                取消
            </div>
            <div class="or" data-text="或"></div>
            <div class="ui green right labeled icon button" id="uploadBtn"> <!-- May need class positive -->
                选择图片
                <i class="file icon"></i>
            </div>
        </div>
    </div>
</div>
<!--上传进度-->
<div class="ui basic second small modal" id="image-uploader">
    <div class="ui icon header">
        <i class="upload icon"></i>

        <p id="upload-status-label">上传中</p>
    </div>
    <div class="content">
        <div class="description">
            <p>请不要刷新页面/关闭</p>
        </div>
    </div>
    <div class="ui indicating progress active" data-value="1" id="upload-bar">
        <div class="bar" style="transition-duration: 300ms; -webkit-transition-duration: 300ms; width: 1%;">
            <div class="progress" id="upload-progress">1</div>
        </div>
    </div>
</div>
<!--上传成功:直接应用图片 不需要提示-->
<!--上传失败-->
<div class="ui basic third small modal" id="image-failed">
    <div class="ui icon header">
        <i class="warning sign icon"></i>

        <p>上传失败</p>
    </div>
    <div class="actions">
        <div class="ui red basic inverted button">
            <i class="remove icon"></i>知道了
        </div>
    </div>
</div>

<script src="//static.dev.mzapp.info/panel/qiniu/plupload/plupload.full.min.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/panel/qiniu/plupload/i18n/zh_CN.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/panel/qiniu/qiniu.min.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/panel/js/image-upload.js" type="text/javascript"></script>
