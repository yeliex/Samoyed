<?php

class SamoyedDB
{
    protected  $db;
    public function  __construct(){
        try {
            $this->db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_DBNAME,DB_USER,DB_PASSWD);
            $this->db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            $this->db->query("SET NAMES UTF8");
        }
        catch(PDOException $e) {
            //如果连接数据库失败，返回错误
            send_json(9000);
            exit;
        }
    }
}