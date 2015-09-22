<?php

class Product extends Samoyed
{
    private $product_id;

    public function __construct()
    {

        parent::__construct();

        $this->protocol = $_GET['protocol'];

        if ((!isset($_GET['product_id'])) || (!$this->checkProduct($_GET['product_id']))) {
            send_json(1000);
            exit;
        }
        $this->product_id = $_GET['product_id'];

        send_json();
        exit;

    }

    //判断协议是否正确
    private function checkProtocol($protocol)
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

    //查询Product
    private function checkProduct($product_id)
    {
        //从数据库中查询是否有这个Product_id
        return true;
    }
}
