<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/7/28
 * Time: 上午9:49
 */
?>
<div class="ye-nav nav-bar" id="ye-nav">
    <div class="ui container">
        <div class="ui large secondary menu inverted">
            <div class="item">
                <div class="ui ye-logo shape">
                    <div class="sides">
                        <div class="active ui side">
                            <div class="ye-logo-title">
                                觅知空间
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui ye-nav-menu item dropdown link" id="selection">
                <i class="sidebar icon"></i> 分类
            </div>
            <div class="ui flowing popup top left transition">
                <div class="ui three column relaxed divided center aligned grid">
                    <div class="row">
                        <div class="ui icon input">
                            <input type="text" placeholder="输入关键字/商圈…" id="ye-select-keyword">
                            <i class="search link icon" onclick="onSelection()"></i>
                        </div>
                        <button class="ui inverted blue button" onclick="onSelection()" style="margin-left: 15px;">
                            马上找房
                        </button>
                        <button class="ui inverted blue button" onclick="window.location.href='/list?target=all'"
                                style="margin-left: 15px;">所有信息
                        </button>

                    </div>
                    <div class="column first">
                        <h4 class="ui header">区域</h4>

                        <div class="ui link list">
                            <a class="item ye-select-district active" name="all">全部</a>
                            <a class="item ye-select-district" name="310002">上城区</a>
                            <a class="item ye-select-district" name="310006">下城区</a>
                            <a class="item ye-select-district" name="310016">江干区</a>
                            <a class="item ye-select-district" name="310011">拱墅区</a>
                            <a class="item ye-select-district" name="310015">西湖区</a>
                            <a class="item ye-select-district" name="310051">滨江区</a>
                            <a class="item ye-select-district" name="311201">萧山区</a>
                            <a class="item ye-select-district" name="311100">余杭区</a>
                        </div>
                    </div>
                    <div class="column">
                        <h4 class="ui header">面积</h4>

                        <div class="ui link list">
                            <a class="item ye-select-size active" name="all">全部</a>
                            <a class="item ye-select-size" name="1">0-100m²</a>
                            <a class="item ye-select-size" name="2">100-200m²</a>
                            <a class="item ye-select-size" name="3">200-300m²</a>
                            <a class="item ye-select-size" name="4">300-500m²</a>
                            <a class="item ye-select-size" name="5">500-1000m²</a>
                            <a class="item ye-select-size" name="6">1000+m²</a>
                        </div>
                    </div>
                    <div class="column">
                        <h4 class="ui header">价位</h4>

                        <div class="ui link list">
                            <a class="item ye-select-price active" name="all">全部</a>
                            <a class="item ye-select-price" name="1">0-5k/天</a>
                            <a class="item ye-select-price" name="2">5-15k/天</a>
                            <a class="item ye-select-price" name="3">15-30k/天</a>
                            <a class="item ye-select-price" name="4">30-50k/天</a>
                            <a class="item ye-select-price" name="5">5-10w/天</a>
                            <a class="item ye-select-price" name="6">10w+/天</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right menu inverted">
<!--                <div class="ui item dropdown link ye-nav-qrCode" id="qrCode">-->
<!--                    <i class="qrcode icon"></i>-->
<!--                </div>-->
<!--                <div class="ui popup transition">-->
<!--                    <img src="http://qr.liantu.com/api.php?&w=120&m=10&text=http://mizhi.pub"/>-->
<!---->
<!--                    <div class="header" style="text-align: center">扫码下载客户端</div>-->
<!--                </div>-->
                <a class="ui inverted button link item">发布信息</a>
                <a class="ui inverted button link item">我要租房</a>
                <a class="ui inverted button link item">房价计算器</a>
                <a class="ui inverted button link item">联系我们</a>
            </div>
        </div>
    </div>
</div>
