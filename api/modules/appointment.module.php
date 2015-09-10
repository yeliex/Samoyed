<?php
require_once './library/HTTPRequest.php';

class Appointment extends Appoint
{

    public function __construct()
    {
        parent::__construct();
    }

    /**
     *   获取本地ID
     */
    public function logined()
    {
        session_start();
        $result = array();
        if (isset($_SESSION['appointment'])) {
            $appointment = json_decode($_SESSION['appointment'], true);
            if ($this->uidExisted($appointment['user_id'])) {
                // UID存在
                $result['user_status'] = "success";
                $result['user_id'] = $appointment['user_id'];
            } else {
                $result['user_status'] = "failed";
                $result['user_id'] = "";
            }
        } else {
            $result['user_status'] = "failed";
            $result['user_id'] = "";
        }
        send_json(0, json_encode($result));
    }

    public function sendVarify()
    {
        $phone = $_POST['phone'];
        $token = $this->smsToken();
        $code = $this->makeVarifyCode();
        if (strlen($phone) != 11) {
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

        $result = $this->sendSMS($data, SMS_URL);
        if ($result['request'] == "failed") {
            send_json(3001);
        } else {
            if ($result['respCode'] == "000000") {
                $result['varifyCode'] = $code;
                send_json(0, json_encode($result), 1);
            } else {
                send_json(3004, json_encode($result), 1);
            }
        }
    }

    public function saveAppointment()
    {
        $data = $this->dataCompress($_POST);
        $save = $this->saveAppointData($data);
        if ($save[0] == true) {
            // 保存成功
            // 发送成功短信
            $result = $this->appointSuccessSMS($data);
            $result['id'] = $save[1];
//            print_r($result);
            if ($result['request'] == "failed") {
                send_json(3001);
                // 短信发送失败
            } else {
                if ($result['respCode'] == "000000") {
                    send_json(0, json_encode($result), 1);
                } else {
                    send_json(3005, json_encode($result), 1);
                }
            }
        } else {
            // 失败: 数据库错误,返回预约ID
            send_json(3021, json_encode(array($save[1])));
        }
    }

    public function appointmentFailed()
    {
        $id = $_GET['id'];
        $sql = "DELETE FROM user_appointment WHERE appoint_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $id);
        $statement->execute();
        send_json(0);
    }

    public function alreadyAppointed()
    {
        $bid = $_GET['bid'];
        $uid = $_GET['uid'];
        $result = array();
        $sql = "SELECT appoint_id FROM user_appointment WHERE appoint_user = :uid AND appoint_building = :bid";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":uid", $uid);
        $statement->bindParam(":bid", $bid);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_NUM);
        if (count($results) == 0) {
            $result['apointed'] = "no";
        } else {
            $result['apointed'] = "yes";
        }
        send_json(0, json_encode($result));
    }
}

class Appoint extends Samoyed
{

    public function __construct()
    {
        parent::__construct();
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

    // 生成验证码
    protected function makeVarifyCode()
    {
        $code = "";
        // 循环6次生成6个字符
        for ($i = 0; $i < 6; $i++) {
            $tmp = rand(0, 9);
            $code .= $tmp;
        }
        return $code;
    }

    // 发送短信
    protected function sendSMS($data, $url)
    {
        $url = $url . "?sid=" . $data['sid'] . "&appId=" . $data['appId'] . "&sign=" . $data['sign'] . "&time=" . $data['time'] . "&templateId=" . $data['templateId'] . "&to=" . $data['to'] . "&param=" . urlencode($data['param']);

        // curl
//        $ch = curl_init();
//        curl_setopt($ch, CURLOPT_URL, urlencode($url));
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        $result = curl_exec($ch);
        // HTTPREQUEST
        $http = new HTTPRequest($url);
        $http->execute();
        $result = $http->getResponseText();
        $error = $http->getError();
        $http->close();

        if ($error) {
            $result['request'] = "failed";
        } else {
            $result = json_decode($result, true)['resp'];
            $result['request'] = "success";
        }

        return $result;
    }

    // 判断用户是否存在
    protected function uidExisted($uid)
    {
        $statement = $this->db->prepare("SELECT user_id AS uid FROM users_info WHERE user_id = :id");
        $statement->bindParam(":id", $uid);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        if (count($result) == 0) {
            // uid不存在
            return false;
        } else {
            return true;
        }
    }

    // 数据处理
    protected function dataCompress($data)
    {
        $data['id'] = $this->getAppointID();
        return $data;
    }

    // 生成预约ID
    protected function getAppointID()
    {
        $time = date("ymdH%");

        $sql = "SELECT user_appointment.appoint_id FROM user_appointment WHERE user_appointment.appoint_id LIKE :time";

        $statement = $this->db->prepare($sql);
        $statement->bindParam(":time", $time);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_NUM);
        $num = count($results);
        if (count($results) == 0) {
            // 没有ID
            $id = date("ymdH") . "01";
        } else {
            for ($i = 0; $i < $num; $i++) {
                $ids[$i] = $results[$i][0];
            }
            sort($ids);
            $id = $ids[$num - 1] + 1;
        }

        return $id;
    }

    // 保存预约
    protected function saveAppointData($data)
    {
//        print_r($data);
        $sql = "INSERT INTO user_appointment
                (appoint_id, appoint_status, appoint_user, appoint_building, appoint_date, appoint_time, appoint_address, appoint_contact)
                VALUES
                (:appoint_id, :appoint_status, :appoint_user, :appoint_building, :appoint_date, :appoint_time, :appoint_address, :appoint_contact)";
        $statement = $this->db->prepare($sql);

        $statement->bindParam(":appoint_id", $data['id']);
        $statement->bindValue(":appoint_status", "1");
        $statement->bindParam(":appoint_user", $data['uid']);
        $statement->bindParam(":appoint_building", $data['bid']);
        $statement->bindParam(":appoint_date", $data['time']['date']);
        $statement->bindParam(":appoint_time", $data['time']['time']);
        $statement->bindParam(":appoint_address", $data['uaddress']);
        $statement->bindParam(":appoint_contact", $data['ucontacts']['uphone']);

        try {
            $statement->execute();
            return array(true, $data['id']);
        } catch (PDOException $e) {
            print_r($e);
            return array(false, $data['id'], $e);
        }
    }

    // 发送预约成功短信
    protected function appointSuccessSMS($data)
    {
        $smsData = array();
        $phone = $_POST['uphone'];
        $token = $this->smsToken();
        if (strlen($phone) != 11) {
            send_json(3003);
            exit;
        }

        $param = array();
        // 时间
        $param[0] = substr($data['time']['date'], 5, 2) . "月" . substr($data['time']['date'], 8, 2) . "日 " . $data['time']['time'];
        // 房源
        $param[1] = $this->getBuildingInfo($data['bid'])['dog_name'];
        $param[2] = substr($phone, 7);

        $smsData['sid'] = SMS_SID;
        $smsData['appId'] = SMS_APPID;
        $smsData['sign'] = $token['token'];
        $smsData['time'] = $token['time'];
        $smsData['templateId'] = SMS_TEMPLATE_APPOINTMENT_RECEIVED;
        $smsData['to'] = $phone;
        $smsData['param'] = join(",", $param);

        return $this->sendSMS($smsData, SMS_URL);

    }

    // 获取房源信息
    protected function getBuildingInfo($id)
    {
        $statement = $this->db->prepare("SELECT building_product.building_id AS dog_id,
                                            building_product.building_name AS dog_name,
                                            building_product.building_area AS dog_area,
                                            building_product.building_district AS dog_district,
                                            building_product.building_address AS dog_add,
                                            building_product.building_pos AS dog_pos,
                                            building_product.building_size AS dog_size,
                                            building_product.building_price AS dog_price,
                                            building_product.building_description AS dog_desc,
                                            building_product.building_pic_num AS pic_num,
                                            building_product.building_pic AS dog_pic,
                                            building_product.building_units_num AS units_num
                                            FROM building_product WHERE
                                            building_product.building_id = :id
                                            ");
        $statement->bindParam(':id', $id);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);
        return $result;
    }
}