<?php

class Usermanager extends UserManagerControl
{

    public function  __construct()
    {
        parent::__construct();
    }

    public function userlist()
    {
        $conditions = $_GET;
        $statement = $this->getSqlStr($conditions);

        try {
            $statement->execute();
//            print_r($statement->debugDumpParams());
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            send_json(0, json_encode($results));
        } catch (PDOException $e) {
            print_r($statement->debugDumpParams());

            send_json(2001, json_encode($e));
        }
    }

    /**
     * 获取用户数量,返回总用户数以及今日注册用户数
     */
    public function userNum()
    {
        $num = array();
        $statement = $this->db->prepare("SELECT * FROM users_info");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $num['total'] = count($results);
        unset($statement);
        unset($results); // 释放

        $date = date('Y.m.d');
        $statement = $this->db->prepare("SELECT * FROM users_info WHERE reg_date = :date");
        $statement->bindParam(":date", $date);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $num['new'] = count($results);

        send_json(0, json_encode($num));
    }

    public function removeUser()
    {
        $id = $_POST['id'];
        $statement = $this->db->prepare("DELETE FROM users_info WHERE users_info.user_id = :id; DELETE FROM user_appointment WHERE  user_appointment.appoint_user = :id;");
        $statement->bindParam(":id", $id);
        try {
            $statement->execute();
            $result['id'] = $id;
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }

    public function userInfo()
    {
        $id = $_GET['id'];
        $statement = $this->db->prepare("SELECT * FROM users_info WHERE users_info.user_id = :id");
        $statement->bindParam(":id", $id);
        try {
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2001, json_encode($e));
        }
    }
}

class UserManagerControl extends Sampyedhouse
{
    public function  __construct()
    {
        parent::__construct();
    }

    public function getSqlStr($conditions)
    {
        $sql = "SELECT users_info.user_id,users_info.user_name,users_info.user_phone,users_info.user_title,
                       users_info.contacts_email,users_info.contacts_phone,users_info.team_info,users_info.team_type,
                       users_info.extract_address,users_info.extract_district,users_info.selection_ads,users_info.reg_date
                FROM   users_info";
        if ($conditions['primer'] == 2 || $conditions['primer'] == 3) {
            $sql .= ",user_appointment";
        }
        if (($conditions['keyword'] != "" && $conditions['target'] != "0") || $conditions['primer'] != "0" || $conditions['team'] == true) {
            // 有搜索关键字或者筛选的时候
            $sql .= " WHERE";
        }
        if ($conditions['keyword'] != "" && $conditions['target'] != "0") {
            // 存在搜索关键字的情况下,工具选择的关键字类型搜索
            $sql .= " ";
            switch ($conditions['target']) {
                case 1: {
                    // 手机号
                    $sql .= "users_info.user_phone LIKE :key OR users_info.contacts_phone LIKE :key";
                    break;
                }
                case 2: {
                    // 用户名
                    $sql .= "users_info.user_name LIKE :key";
                    break;
                }
                case 3: {
                    // 用户ID
                    $sql .= "users_info.user_id LIKE :key";
                    break;
                }
                case 4: {
                    // 邮箱
                    $sql .= "users_info.contacts_email LIKE :key";
                    break;
                }
            }
        }
        if ($conditions['primer'] != "0") {
            if ($conditions['keyword'] != "" && $conditions['target'] != "0") {
                $sql .= " AND";
            }
            // 存在搜索关键字的情况下,工具选择的关键字类型搜索
            $sql .= " ";
            switch ($conditions['primer']) {
                case 1: {
                    // 新用户
                    $sql .= "users_info.reg_date = '" . date('Y.m.d') . "'";
                    break;
                }
                case 2: {
                    // 有预约
                    $sql .= "users_info.user_id =  user_appointment.appoint_user";
                    break;
                }
                case 3: {
                    // 无预约
                    $sql .= "users_info.user_id != user_appointment.appoint_user";
                    break;
                }
                case 4: {
                    // 性别: 男
                    $sql .= "users_info.user_title = '先生'";
                    break;
                }
                case 5: {
                    // 性别: 女
                    $sql .= "user_name LIKE :key = '女士'";
                    break;
                }
            }
        }
        if ($conditions['team'] == true) {
            if (($conditions['keyword'] != "" && $conditions['target'] != "0") || $conditions['primer'] != "0") {
                $sql .= " AND";
            }
            $sql .= "users_info.team_type = yes";
        }
        // 将结果排序
        $sql .= " ORDER BY users_info.user_id";
        $statement = $this->db->prepare($sql);
        if ($conditions['keyword'] != "" && $conditions['target'] != "0") {
            $statement->bindParam(":key", $conditions['keyword']);
        }
        return $statement;
    }
}