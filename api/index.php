<?php

//// 设置允许跨域请求
header('Access-Control-Allow-Origin: *');

// 在这里关闭错误
ini_set('display_errors', 1);
error_reporting(E_ALL & ~E_NOTICE);

require('./library/lib.php');
require('./config/db.config.php');
require('./config/sms.config.php');
require('./config/ses.config.php');
require('./library/db.php');
require('./modules/samoyed.module.php');
require_once './library/HTTPRequest.php';

// 需要注意到，因为 Rewrite 获取的URL地址的第一个字符是"/"所以需要用 substr 将其删除
// 如果日后因为 rewrite 配置修改了，那么一般问题也是出现在这里的

$urls = explode('/', substr($_GET['url'], 1));
$class_name = "";
$class = null;

// 如果第一个参数为api: domain/api
if ($urls[0] == "api") {
    array_shift($urls);
}

if (isset($urls[0]) && ($urls[0] != "")) {
    $class_name = ucfirst($urls[0]);
} else {
    // 因为 urls[0] 是空的，那么访问首页
    $class_name = "Home";
}

// 确定这个类的文件是否存在
$class_file_name = "./modules/" . lcfirst($class_name) . "." . "module.php";

if (file_exists($class_file_name)) {

    require($class_file_name);

} else {
    // 返回错误，停止脚本运行
    // 7001错误，没有找到 Class 文件
    send_json(7010);
    exit;
}

$class = new $class_name();
//接着判断$urls[1]是否有值，如果，没有的话，那么默认显示一个empty json返回
if (isset($urls[1]) && ($urls[1] != "")) {

    if (method_exists($class, $urls[1])) {

        $class->{$urls[1]}();

    } else {
        // 如果该类中不存在此方法
        send_json();
        exit;
    }

} else {
    // 默认调用一个方法，如果 $urls[1] 不存在的话
    if (method_exists($class, 'defaultAction')) {
        $class->defaultAction();
    }
}
