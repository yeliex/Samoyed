<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/6/7
 * Time: 下午11:58
 */
require 'config.php';
//$config = new config();
$GLOBALS['connect'] = mysql_connect($Mysql_host, $Mysql_user, $Mysql_passWD);
mysql_select_db($Mysql_dbName, $GLOBALS["connect"]);
mysql_query("set character set 'utf8'");
mysql_query("set names 'utf8'");
if (!$GLOBALS['connect']) {
    die('Could not connect: ' . $GLOBALS['connect'] . mysql_error());
}

?>