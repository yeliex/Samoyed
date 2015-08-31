<?php
    class Samoyed extends SamoyedDB{
        protected $db;
        protected $protocol;

        public function __construct(){
            parent::__construct();

            //获得API参数
            if((!isset($_GET['protocol'])) || (!$this->checkProtocol($_GET['protocol']))){
                //如果没有设置protocol，那么返回错误
                send_json(1010);
                exit;
            }
            $this->protocol = $_GET['protocol'];
        }

        //判断协议是否正确
        protected function checkProtocol($protocol){
            //可接受的返回协议
            if($_GET['protocol'] != "json"
    //      || $_GET['protocol'] != "xml"
    //      || $_GET['protocol'] != "html"
            ){
                //如果设置了未知的protocol，那么返回错误
                return false;
            }else{
                return true;
            }
        }

        //判断城市的参数是否正确
        //输入城市编号
        //未来可能需要根据数据库之类的要进行查询城市是否正确
        protected function checkCity($phone_number){

            if($phone_number == "0571"){
                return true;
            }else{
                return false;
            }

        }

        //判断区的参数是否正确
        //输入区号
        //未来可能需要根据数据库之类的要进行查询区号是否正确
        protected function checkDistrict($post_number){

            if($post_number == 0){
                return true;
            }

            switch($post_number){
                case "0":
                case "310051":
                    return true;
                break;
                default:
                    return false;
                break;
            }
        }

        //判断面积的参数是否正确
        protected function checkSize($size){
            switch($size){
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                    return true;
                break;
                default:
                    return false;
                break;
            }
        }

        //判断价格的区间参数是否正确
        protected function checkPrice($price){
            switch($price){
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                    return true;
                break;
                default:
                    return false;
                break;
            }
        }
    }
