<?php
// 返回信息

/**
 * @param int $error_code 错误代码
 * @param string $data 返回数据
 * @param string $error_info 自定义错误信息
 */
function send_json($error_code = 0, $data = "", $error_info = "")
{

    $result = "failed";

    switch ($error_code) {
        case 0:
            $result = "success";
            $error_info = " ";
            break;
        case 1001:
            $error_info = "API接口错误(未知协议)";
            break;
        case 1011:
            $error_info = "用户名或密码不能为空";
            break;
        case 1012:
            $error_info = "用户名或密码不能为空";
            break;
        case 1013:
            $error_info = "用户名或密码错误";
            break;
        case 2001:
            $error_info = "数据错误";
            break;
        case 2002:
            $error_info = "数据库操作错误";
            break;
        case 7010:
            $error_info = "不存在的类";
            break;
        case 3301:
            $error_info = "不存在ID";
            break;
        case 3302:
            $error_info = "不存在的建筑(建筑ID错误)";
            break;
        case 3303:
            $error_info = "不存在建筑或者该建筑没有图片";
            break;
        case 3311:
            $error_info = "保存失败";
            break;
        default: {
            if ($error_info == "") {
                $error_info = "未知错误";
            }
            break;
        }
    }

    header('Content-type: application/json');

    if ($error_code == 0) {
        echo sprintf('{"status":"%s","error_code":"%s","error_info":"%s","data":%s}', $result, $error_code, $error_info, $data);
    } else {
        echo sprintf('{"status":"%s","error_code":"%s","error_info":"%s","data":""}', $result, $error_code, $error_info, $data);
    }


}

?>
