<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/26
 * Time: 下午12:16
 */

class Appointment extends Samoyed{

    public function __construct(){
        parent::__construct();
    }

    /**
    *   获取本地ID
    */
    public function ifUser(){
        $result = array();
        if(isset($_COOKIE['appointment'])){
            $appointment = json_decode($_COOKIE['appointment']);
            $result['user_status'] = "success";
            $result['user_id'] = $appointment['user_id'];
        }
        else {
            $result['user_status'] = "failed";
            $result['user_id'] = "";
        }
        send_json(0,json_encode($result));
    }

}