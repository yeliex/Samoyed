<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/2
 * Time: 下午10:05
 */
?>
<?php
// 获取到文件名
// 程序会通过 ./contents.php?target=/pageName&_=时间戳 的api来ajax调用当前content的内容
// 所以可以通过$_Get['target']来获取对应的文件,include后会直接返回web内容
// 注意: 可能会存一定的安全问题需要处理,未验证
$url = explode('/', substr($_GET['target'], 1))[0]; // 因为参数第一个字符为 '/',所以需要删除
$fileName = "./contents/" . strtolower($url) . "." . "html";
include_once $fileName;

?>
