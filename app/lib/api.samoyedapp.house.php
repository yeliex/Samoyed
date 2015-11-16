<?php

class SampyedApphouse extends SamoyedDB
{

    protected $db;

    public function  __construct()
    {
        parent::__construct();

        // 获取API参数
//        if ((!isset($_GET['protocol'])) || (!$this->checkProtocol($_GET['protocol']))) {
//
//            //如果没有设置protocol，那么返回错误
//
//            send_json(1001);
//            exit;
//        }

        $this->protocol = $_GET['protocol'];
    }

    // 判断参数: 协议
    /**
     * @param $protocol 协议
     * @return bool
     */
    protected function  checkProtocol($protocol)
    {
        //可接受的返回协议
        if ($_GET['protocol'] != "json"
            //      || $_GET['protocol'] != "xml"
            //      || $_GET['protocol'] != "html"
        ) {
            //如果设置了未知的protocol，那么返回错误
            return false;
        } else {
            return true;
        }
    }


}