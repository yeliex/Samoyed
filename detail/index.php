<?php /** * Created by PhpStorm. * User: yeliex * Date: 15/7/8 * Time: 下午12:24 */ ?><?php include_once "base.html";
$get = $_GET;
if ($get['id'] == "") {
    pageErr();
    exit;
}
function pageErr()
{
    echo "<script type='text/javascript'>location.href=location.origin;</script>";
} ?>
<div class="ye-detail"><?php include "nav.html"; ?>
    <div class="seg-wrapper">
        <div class="segament">
            <div class="intro-wrapper">
                <div class="ui container">
                    <div class="intro title"><h1><span class="bname"></span></h1>

                        <h2></h2></div>
                    <div class="intro info"><h1><span></span> 元/平方米/天</h1>

                        <h2><span></span> 平方米</h2></div>
                </div>
            </div>
        </div><?php include "appointment.html"; ?></div>
    <div class="main-wrapper">
        <div class="ui container">
            <div class="detail-wrapper">
                <div class="ui grid">
                    <div class="twelve wide column">
                        <div class="ui container">
                            <div class="detail-units detail-item">
                                <div class="detail-title"><h1>户型</h1>

                                    <h2>户型数:<span></span></h2></div>
                                <div class="units-list">
                                    <ul class="col">
                                        <li class="list-title">
                                            <ul>
                                                <li>名称</li>
                                                <li>面积 (平方米)</li>
                                                <li>价格 (元/天/平)</li>
                                                <li>装修</li>
                                                <li>图片</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="detail-desc detail-item">
                                <div class="detail-title"><h1>描述</h1></div>
                                <div class="desc-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="sixteen wide column">
                        <div class="detail-img detail-item">
                            <div class="ui grid">
                                <div class="twelve wide column">
                                    <div class="detail-title"><h1>照片</h1></div>
                                </div>
                                <div class="sixteen wide column">
                                    <div class="img-list">
                                        <div class="ui medium images"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="detail-map detail-item">
                            <div class="ui grid">
                                <div class="twelve wide column">
                                    <div class="detail-title"><h1>地图</h1></div>
                                </div>
                                <div class="sixteen wide column">
                                    <div class="map-content">
                                        <div id="map-content"></div>
                                        <div class="btn-wrapper">
                                            <div class="toggle">
                                                <div class="ui slider checkbox" tabindex="0" id="zoom-btn"><input
                                                        type="checkbox"><label>地图缩放(<span>关</span>)</label></div>
                                            </div>
                                            <div class="ui animated fade blue button" tabindex="0" id="panorama-btn">
                                                <div class="visible content">街景</div>
                                                <div class="hidden content"><i class="building icon"></i></div>
                                            </div>
                                            <div class="ui animated fade blue button" tabindex="0" id="refresh-btn">
                                                <div class="visible content">重置</div>
                                                <div class="hidden content"><i class="repeat icon"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ui modal" id="image-modal">
    <div class="header"><span></span></div>
    <div class="image content"><img class="image modal" src=""></div>
</div>
<script src="//static.dev.mzapp.info/client/js/nav.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/client/js/detail.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/client/js/data-ui.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/client/js/detail-data.js" type="text/javascript"></script>
<script src="http://webapi.amap.com/maps?v=1.3&key=1676d7888ce2e2e14cf102d933bedafd" type="text/javascript"></script>
<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp&key=GDPBZ-JNJ3F-JQ3JW-JBB5E-JICFZ-UDBVO"></script>
<?php
include "footer.html";
?>
<script src="http://static.mzapp.info/public/js/google_analytics.js" type="text/javascript"></script>
</body></html>