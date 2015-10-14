<?php
// 设置允许跨域请求
header('Access-Control-Allow-Origin: *');
// 在这里关闭错误
ini_set('display_errors', 'on'); // 设置display_errors 为OFF
error_reporting(E_ALL & ~E_NOTICE); // 关闭错误提示

// Import requirement
require_once "config/db_config.php";
require_once "lib/db_connection.php";
require_once "lib/return.php";
require_once "mods/samoyedhouse.module.php";

// 获取参数
$urls = explode('/', substr($_GET['url'], 1)); // 因为参数第一个字符为 '/',所以需要删除
$class_name = "";
$class = null;
// 如果第一个参数为api: domain/api
if ($urls[0] == "api") {
    array_shift($urls);
}
// 获取类名
if (isset($urls[0]) && ($urls[0] != "")) {
    $class_name = ucfirst($urls[0]); // 类名开头大写
} else {
    //因为urls[0]是空的，那么访问首页
    $class_name = "Home";
}

// 确定这个类的文件是否存在
$class_file_name = "./mods/" . lcfirst($class_name) . "." . "module.php";

if (file_exists($class_file_name)) {

    if ($class_name == "Imageupload") {
        require_once "../api-lib/qiniu/autoload.php";
    }
    require($class_file_name);  // 引入类文件

} else {
    // 返回错误，停止脚本运行
    // 7001错误，没有找到Class 文件
    send_json(7010);
    exit;
}

// 初始化类
$class = new $class_name();
// 接着判断$urls[1]是否有值，如果，没有的话，那么默认显示一个empty json返回
// 如果有值则调用方法
if (isset($urls[1]) && ($urls[1] != "")) {

    if (method_exists($class, $urls[1])) {

        $class->{$urls[1]}();

    } else {
        //如果该类中不存在此方法
        send_json();
        exit;
    }

} else {
    // 调用默认方法，如果$urls[1]不存在的话
    if (method_exists($class, 'defaultAction')) {
        $class->defaultAction();
    }
}

?>
