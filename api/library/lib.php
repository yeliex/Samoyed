<?php

    // 格式化返回数据
    function send_json($error_code = 0,$data = "",$num = 0){

        $status_text = "";
        $result = "failed";

        switch($error_code){
            case 0:
                $result = "success";
                $status_text = "";
            break;
            case 1010:
                $status_text = "API接口错误（未知协议）";
            break;
            case 1020:
                $status_text = "API接口错误（未知城市）";
            break;
            case 1030:
                $status_text = "API接口错误（未知邮编号）";
            break;
            case 1040:
                $status_text = "API接口错误（未知的面积类型）";
            break;
            case 1050:
                $status_text = "API接口错误（未知的价格类型）";
            break;
            case 1060:
                $status_text = "API接口错误（请使用KeyWord）";
            break;
            case 1070:
                $status_text = "错误的Building ID";
            break;
            // 预约相关错误
            case 3001:
                $status_text = "验证码发送失败:网络错误";
                break;
            case 3002:
                $status_text = "手机号不能为空";
                break;
            case 3003:
                $status_text = "验证码发送失败";
                break;
            case 3004:
                $status_text = "注册成功通知发送失败";
                break;
            case 7010:
                $status_text = "类文件不存在";
            break;
            case 9000:
                $status_text = "无法建立数据库连接";
            break;
            default:
                $status_text = "未知错误";
            break;
        }

        header('Content-type:application/json');
        if($data != ""){
            echo sprintf('{"status":"%s","error_code":"%s","error_info":"%s","num":%d,"overview":%s}', $result , $error_code , $status_text , $num , $data );
        }else{
            echo sprintf('{"status":"%s","error_code":"%s","error_info":"%s","num":%d,"overview":""}', $result , $error_code , $status_text , $num , $data );
        }
    }



/*
    Error Code

    7010: 没有找到class file 文件
    1000: API接口的product_id不存在
    1010: API接口的protocol错误
    1020: API接口的city区号错误
    1030: API接口的邮编错误
    1040: API接口的未知的面积区域
    1050: API接口的未知的价格区域
    9000: DB错误

*/
