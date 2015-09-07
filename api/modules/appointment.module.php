<?php

class Appointment extends Appoint {

    public function __construct(){
        parent::__construct();
    }

    /**
    *   获取本地ID
    */
    public function logined(){
        session_start();
        $result = array();
        if(isset($_SESSION['appointment'])){
            $appointment = json_decode($_SESSION['appointment'],true);
            $result['user_status'] = "success";
            $result['user_id'] = $appointment['user_id'];
        }
        else {
            $result['user_status'] = "failed";
            $result['user_id'] = "";
        }
        send_json(0,json_encode($result));
    }

    public  function sendVarify(){
        $phone = $_POST['phone'];
        $token = $this->smsToken();
        $code = $this->makeVarifyCode();
        if(strlen($phone)!=11){
            send_json(3003);
            exit;
        }
        //发送短信
        $data = array();
        $data['sid'] = SMS_SID;
        $data['appId'] = SMS_APPID;
        $data['sign'] = $token['token'];
        $data['time'] = $token['time'];
        $data['templateId'] = SMS_TEMPLATE_APPOINTMENT_VARIFY;
        $data['to'] = $phone;
        $data['param'] = $code;

        $result = $this->sendSMS($data,SMS_URL);
        if($result['request'] == "failed"){
            send_json(3001);
        }
        else {
            if($result['respCode'] == "000000"){
                $result['varifyCode'] = $code;
                send_json(0,json_encode($result),1);
            }
            else {
                send_json(3002,json_encode($result),1);
            }
        }
    }
}

class Appoint extends Samoyed {

    public function __construct(){
        parent::__construct();
    }

    // 获取短信token
    protected function smsToken(){
        $time = date('YmdHis000');
        $token = md5(SMS_SID.$time.SMS_ATOKEN);
        $result = array();
        $result['time'] = $time;
        $result['token'] = $token;
        return $result;
    }

    // 生成验证码
    protected function makeVarifyCode(){
        $code = "";
        // 循环6次生成6个字符
        for($i=0;$i<6;$i++){
            $tmp = rand(0,9);
            $code .= $tmp;
        }
        return $code;
    }

    // 发送短信
    protected function sendSMS($data,$url){
        $ch = curl_init();

        $url = $url."?sid=".$data['sid']."&appId=".$data['appId']."&sign=".$data['sign']."&time=".$data['time']."&templateId=".$data['templateId']."&to=".$data['to']."&param=".$data['param'];
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        $result = curl_exec($ch);
        if(curl_error($ch)) {
            $result['request'] = "failed";
        }
        else {
            $result = json_decode($result,true)['resp'];
            $result['request'] = "success";
        }
        curl_close($ch);
        return $result;
    }
}