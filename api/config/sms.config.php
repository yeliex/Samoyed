<?php
define("SMS_SERVICES","UCPAAS"); // SMS服务商 融云
//define('SMS_URL','http://dev.mzapp.info/index.php'); // API接口: 简单短信模板
define('SMS_URL','www.ucpaas.com/maap/sms/code'); // API接口: 简单短信模板
define('SMS_POST',1); // 数据发送方式: post

define('SMS_SID','b78f343c730bb97c2d087534bb6c9172'); // Account Sid
define('SMS_ATOKEN','b87d7ee7b13af07e34e421bda55e9d0e'); // Auth Token
define('SMS_APPID','e94c639f04904e758a6674ad2871e4d3'); // APP ID _Dev
//define('SMS_APPID','023cb07e1eb049faa124a1e099042db9'); // APP ID
define('SMS_TEMPLATE_APPOINTMENT_VARIFY',"12283");
define('SMS_TEMPLATE_REGISTER_SUCCESS',"12734");
define('SMS_TEMPLATE_REGISTER_SUCCESS_Mr',"12763");
define('SMS_TEMPLATE_REGISTER_SUCCESS_Ms',"12764");
define('SMS_TEMPLATE_APPOINTMENT_RECEIVED',"12818");
?>

<?
/**
 * 12283 预约登录 SMS_TEMPLATE_APPOINTMENT_VARIFY : 您正在申请登录以进行预约，验证码为：{1}，30分钟内有效。非本人操作请忽略。
 * 12734 注册成功通知 SMS_TEMPLATE_REGISTER_SUCCESS : 尊敬的 {1}，您已成功注册，以后可以使用本手机号（{2}）直接登录。顺颂商祺。
 * 12763 注册成功通知Mr SMS_TEMPLATE_REGISTER_SUCCESS_Mr : 尊敬的 {1} 先生，您已成功注册，以后可以使用本手机号（{2}）直接登录。顺颂商祺。
 * 12764 注册成功通知Mr SMS_TEMPLATE_REGISTER_SUCCESS_Ms : 尊敬的 {1} 女士，您已成功注册，以后可以使用本手机号（{2}）直接登录。顺颂商祺。
 * 12818 预约收到通知 SMS_TEMPLATE_APPOINTMENT_RECEIVED 我们已收到您 {1} 到 {2} 的预约，工作人员会在1小时内与您联系确认，请保持手机（{3}）畅通。顺颂商祺。
 */

?>