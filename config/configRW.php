<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/6/8
 * Time: 上午12:48
 */
$GLOBALS['config_path'] = "config.php";

$config = new config();
$config->site_name = $config->configRead('site_name');
$config->Mysql_host = $config->configRead('Mysql-host');
$config->Mysql_user = $config->configRead('Mysql-user');
$config->Mysql_passWD = $config->configRead('Mysql-passWD');

class config {
    function configRead($config_item,$type = 'string'){
        $str = file_get_contents("./config/config.php");
        if($type == 'int')
        {
            $config_value = preg_match("/" . $config_item . "=(.*);/", $str, $result);
            Return $result[1];
        }
        else
        {
            $config_value = preg_match("/" . $config_item . "=\"(.*)\";/", $str, $result);
            if($result[1] == null)
            {
                $config_value = preg_match("/" . $config_item . "='(.*)';/", $str, $result);
            }
            Return $result[1];
        }
    }
}
class configUpdate {
    function configWrite($config_item,$config_value,$config_type = 'string'){

    }
}
