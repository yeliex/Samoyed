<?php
define("SES_SERVICES", "SENDCLOUD"); // SES服务商 sendcloud
define("SES_URL_DOMAIN", "sendcloud.sohu.com"); // SES服务商接口域名
define('SES_URL', '/webapi/mail.send_template.json'); // API接口: 邮件模板发送, 地址不能出现http
define('SES_POST', 1); // 数据发送方式: post

define('SES_API_USER', 'mizhiroom'); // API User
define('SES_API_KEY', 'aUcLZ8HBUa4sCavZ'); // API Key
define('SES_FROM', "no-reply@mail.mzapp.info"); // 显示发送的地址
define('SES_FROM_DOMAIN', "mail.mzapp.info"); // 发送域名
define('SES_FROM_NAME', "觅知空间"); // 显示发送的名字
define('SES_TEMPLATE_REGISTER_SUCCESS', "SES_TEMPLATE_REGISTER_SUCCESS"); // 模板: 注册成功 参数: user,phone,contact_phone,mail,address
define('NEW_CONTACT_REQUEST', "NEW_CONTACT_REQUEST"); // 模板: [内部]新的用户联系请求 参数: type(请求类型:租房/房源),user,phone,mail,info
define('CONTACT_REQUEST_RECEIVED', "CONTACT_REQUEST_RECEIVED"); // 模板: [觅知空间]我们已收到您的请求 参数: type(请求类型:租房/房源),user,phone,mail,info

?>

<?
/**
 * SES_TEMPLATE_REGISTER_SUCCESS 注册成功 : http://dev.mzapp.info/static/public/services/SES_TEMPLATE/REGISTER_SUCCESS.html
 * NEW_CONTACT_REQUEST [内部]新的用户联系请求 : http://dev.mzapp.info/static/public/services/SES_TEMPLATE/NEW_CONTACT_REQUEST.html
 * CONTACT_REQUEST_RECEIVED [觅知空间]我们已收到您的请求 : http://dev.mzapp.info/static/public/services/SES_TEMPLATE/CONTACT_REQUEST_RECEIVED.html
 */

?>