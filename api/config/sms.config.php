<?php
define("SMS_SERVICES","UCPAAS"); // SMS服务商 融云
//define('SMS_URL','http://dev.mzapp.info/index.php'); // API接口: 简单短信模板
define('SMS_URL','http://www.ucpaas.com/maap/sms/code'); // API接口: 简单短信模板
define('SMS_POST',1); // 数据发送方式: post

define('SMS_SID','b78f343c730bb97c2d087534bb6c9172'); // Account Sid
define('SMS_ATOKEN','b87d7ee7b13af07e34e421bda55e9d0e'); // Auth Token
define('SMS_APPID','e94c639f04904e758a6674ad2871e4d3'); // APP ID _Dev
//define('SMS_APPID','023cb07e1eb049faa124a1e099042db9'); // APP ID
define('SMS_TEMPLATE_APPOINTMENT_VARIFY',"12283");
?>

<?
/**
 * 12251 预约登录 SMS_TEMPLATE_APPOINTMENT_VARIFY : 您正在申请登录以进行预约，验证码为：{1}，30分钟内有效。非本人操作请忽略。
 */
?>