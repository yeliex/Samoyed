<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/10/21
 * Time: 下午2:51
 */
?>
    <!Doctype html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0"/>
        <meta name="description" content="觅知空间为成长型企业提供最优惠，最真实，最有调的办公室出租服务。"/>
        <meta name="keywords" content="办公室出租,写字楼出租,产业园,创意园,商务中心,觅知空间"/>
        <title>觅知空间 | 创业从未如此简单,创业,写字楼,出租,办公,创意园出租</title>
        <!-- Basic JS Requirement -->
        <script src="//static.mzapp.info/public/js/jQuery/jquery.min.js" type="text/javascript"></script>
        <script src="//static.dev.mzapp.info/public/js/jQuery/queryUrl.js" type="text/javascript"></script>
        <script src="//static.dev.mzapp.info/client/js/list/address.js" type="text/javascript"></script>
        <!-- Style -->
        <link href="//cdn.bootcss.com/semantic-ui/2.1.4/semantic.min.css" rel="stylesheet">
        <script src="//cdn.bootcss.com/semantic-ui/2.1.4/semantic.min.js"></script>
        <link href="//static.dev.mzapp.info/client/css/list/list.css" type="text/css" rel="stylesheet">
        <?php
        // 判断设备类型
        $isMobile = false;
        require_once "../api/library/Mobile_Detect.php";
        $device = new Mobile_Detect();
        if ($device->isMobile() || $device->isTablet()) {
            $isMobile = true; // 符合移动设备类型
        }

//        $isMobile = true;// 移动测试

        if ($isMobile) {
            echo "<link href='//static.dev.mzapp.info/client/css/list/mobile.css' rel='stylesheet' type='text/css'>"; // 加载移动样式表
        } else {
            echo "<link href='//static.dev.mzapp.info/client/css/list/desktop.css' rel='stylesheet' type='text/css'>"; // 加载桌面样式表
        }
        ?>
    </head>
    <body>
<?php
require_once "nav.html";
if($isMobile){
    require_once "nav_mobile.html";
}
else {
    require_once "nav_desktop.html";
}
//echo "<script src='//static.dev.mzapp.info/client/js/list/nav.js' ></script>";
if ($isMobile) {
//    echo "<script src='//static.dev.mzapp.info/client/js/list/mobile.js' ></script>";
} else {
//    echo "<script src='//static.dev.mzapp.info/client/js/list/desktop.js' ></script>";
}