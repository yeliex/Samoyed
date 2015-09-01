<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/31
 * Time: 下午2:12
 */

class Appointuser extends Samoyed{

    public function __construct(){
        parent::__construct();
    }

    public function userExisted(){
        $phone = $_GET['phone'];
        $sql = "SELECT user_id AS uid FROM users_info WHERE users_info.user_phone = :phone";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(":phone",$phone);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $return = array();
        if(count($result)!= 1){
            // 当前号码对应的用户数不为1
            $return['status'] = "error";
            $return['uid'] = "";
        }
        else {
            $return['status'] = "success";
            $return['uid'] = $result['uid'];
        }
        send_json(0,json_encode($return));
    }

    public function userLogin(){
        $uid = $_POST['uid'];
        // 用户登陆,写入session
        session_start();
        $appointment = array();
        $appointment['user_status'] = 'success';
        $appointment['user_id'] = $uid;
        $_SESSION['appointment'] = $appointment;
        send_json(0);
    }

    public function userInfo(){
        $uid = $_GET['uid'];
        $sql = "SELECT user_id AS user_id,
                       user_name AS user_name,
                       user_phone AS user_phone,
                       user_email AS user_email,
                       user_male AS user_male
                FROM users_info
                WHERE users_info.user_id = :uid";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(":uid",$uid);
        $statement->execute();

        send_json(0);
    }
}