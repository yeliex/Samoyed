<?php

/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/31
 * Time: 下午2:12
 */
class Appointuser extends AppointuserControl
{

    public function __construct()
    {
        parent::__construct();
    }

    public function userExisted()
    {
        $phone = $_GET['phone'];
        $sql = "SELECT user_id AS uid FROM users_info WHERE users_info.user_phone = :phone";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(":phone", $phone);
        $statement->execute();

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        $return = array();
        if (count($result) != 1) {
            // 当前号码对应的用户数不为1
            $return['status'] = "error";
            $return['uid'] = "";
        } else {
            $return['status'] = "success";
            $return['uid'] = $result[0]['uid'];
        }
        send_json(0, json_encode($return));
    }

    public function userLogout()
    {
        session_start();
        unset($_SESSION['appointment']);
        send_json(0);
    }

    public function userLogin()
    {
        $uid = $_POST['uid'];
        // 判断uid是否存在


        // 用户登陆,写入session
        session_start();
        $appointment = array();
        $appointment['user_status'] = 'success';
        $appointment['user_id'] = $uid;
        $_SESSION['appointment'] = json_encode($appointment);
        send_json(0);
    }

    public function userInfo()
    {
        $uid = $_GET['uid'];
        $sql = "SELECT user_id AS user_id,
                       user_name AS user_name,
                       user_phone AS user_phone,
                       user_title AS user_title,
                       contacts__email AS contacts__email,
                       contacts_phone AS contacts_phone,
                       team_type AS team_type,
                       team_info AS team_info,
                       extract_district AS extract_district,
                       extract_address AS extract_address,
                       selection_ads AS selection_ads
                FROM users_info
                WHERE users_info.user_id = :uid";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(":uid", $uid);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);

        // 还需要生成数据
        send_json(0, json_encode($results));
    }

    public function userSave()
    {
        $data = $this->dataCompress($_POST);
        $sql = "INSERT INTO users_info
                (user_id, user_phone, user_name, user_title, contacts__email, contacts_phone, team_type, team_info, extract_district, extract_address, selection_ads)
                VALUES
                (:user_id , :user_phone , :user_name , :user_title , :contacts__email , :contacts_phone , :team_type , :team_info , :extract_district , :extract_address , :selection_ads)";
        $user_id = $this->newUserID();
        $statement = $this->db->prepare($sql);

        $statement->bindParam(":user_id", $user_id);
        $statement->bindParam(":user_phone", $data['phone']);
        $statement->bindParam(":user_name", $data['personal']['name']);
        $statement->bindParam(":user_title", $data['personal']['title']);
        $statement->bindParam(":contacts__email", $data['contacts']['email']);
        $statement->bindParam(":contacts_phone", $data['contacts']['phone']);
        $statement->bindParam(":team_type", $data['team']['team']);
        $statement->bindParam(":team_info", $data['team']['info']);
        $statement->bindParam(":extract_district", $data['extract']['district']);
        $statement->bindParam(":extract_address", $data['extract']['address']);
        $statement->bindParam(":selection_ads", $data['selection']['ads']);

        $statement->execute();
        $result = array();
        $result['uid'] = $user_id;
        if ($this->registerSuccess($data['personal']['name'], $data['personal']['title'], $data['phone'])) {
            send_json(0, json_encode($result));
        } else {
            send_json(3004, json_encode($result));
        }
    }

    public function registerFailed()
    {
        $id = $_POST['id'];
        $sql = "DELETE FROM users_info WHERE user_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $id);
        $statement->execute();
        send_json(0);
    }
}

class AppointuserControl extends Samoyed
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function newUserID()
    {
        $statement = $this->db->prepare("SELECT user_id AS user_id FROM users_info");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $num = count($results) - 1;
        if (count($results) == 0) {
            // 没有ID
            $uid = "190001";
        } else {
            for ($i = 0; $i < $num; $i++) {
                $ids[$i] = $results[$i][0];
            }
            sort($ids);
            $uid = $ids[$num - 1] + 1;
        }
        return $uid;
    }

    protected function dataCompress($data)
    {
        $data['team']['info'] = json_encode($data['team']['info']);
        return $data;
    }

    protected function registerSuccess($name, $title, $phone)
    {
        $token = $this->smsToken();
        //发送短信
        $data = array();
        $data['sid'] = SMS_SID;
        $data['appId'] = SMS_APPID;
        $data['sign'] = $token['token'];
        $data['time'] = $token['time'];
        $data['templateId'] = ($title == "先生") ? SMS_TEMPLATE_REGISTER_SUCCESS_Mr : SMS_TEMPLATE_REGISTER_SUCCESS_Ms;
        $data['to'] = $phone;
        $data['param'] = $name . "," . substr($phone, 7);

        $result = $this->sendSMS($data, SMS_URL);
        if ($result['request'] == "failed") {
            return false;
        } else {
            if ($result['respCode'] == "000000") {
                return true;
            } else {
                return false;
            }
        }
    }

    // 获取短信token
    protected function smsToken()
    {
        $time = date('YmdHis000');
        $token = md5(SMS_SID . $time . SMS_ATOKEN);
        $result = array();
        $result['time'] = $time;
        $result['token'] = $token;
        return $result;
    }

    // 发送短信
    protected function sendSMS($data, $url)
    {
        $ch = curl_init();

        $url = $url . "?sid=" . $data['sid'] . "&appId=" . $data['appId'] . "&sign=" . $data['sign'] . "&time=" . $data['time'] . "&templateId=" . $data['templateId'] . "&to=" . $data['to'] . "&param=" . $data['param'];
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($ch);

        if (curl_error($ch)) {
            $result['request'] = "failed";
        } else {
            $result = json_decode($result, true)['resp'];
            $result['request'] = "success";
        }
        curl_close($ch);
        return $result;
    }
}