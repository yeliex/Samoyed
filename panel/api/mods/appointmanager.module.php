<?php

/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/9/10
 * Time: 下午5:07
 */
class Appointmanager extends AppointControl
{

    public function  __construct()
    {
        parent::__construct();
    }

    public function appointlist()
    {
        $conditions = $_GET;

        $statement = $this->getSqlStr($conditions);
        try {
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            send_json(0, json_encode($results));
        } catch (PDOException $e) {
//            print_r($statement->debugDumpParams());
            send_json(2001, json_encode($e));
        }
    }

    public function appointNum()
    {
        $num = array();
        $statement = $this->db->prepare("SELECT * FROM user_appointment");
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $num['total'] = count($results);
        unset($statement);
        unset($results); // 释放

        $date = date('ymd%');
        $statement = $this->db->prepare("SELECT * FROM user_appointment WHERE appoint_id LIKE :date");
        $statement->bindParam(":date", $date);
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $num['new'] = count($results);

        send_json(0, json_encode($num));
    }

    public function removeAppointment()
    {
        $id = $_POST['id'];
        $statement = $this->db->prepare("DELETE FROM user_appointment WHERE  user_appointment.appoint_id = :id;");
        $statement->bindParam(":id", $id);
        try {
            $statement->execute();
            $result['id'] = $id;
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }

    public function editAppointment()
    {
        $data = $_POST;
        $sql = "UPDATE user_appointment
                SET appoint_contact = :appoint_contact,
                    appoint_address = :appoint_address,
                    appoint_date = :appoint_date,
                    appoint_time = :appoint_time
                WHERE appoint_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $data['id']);
        $statement->bindParam(":appoint_contact", $data['contact']);
        $statement->bindParam(":appoint_address", $data['address']);
        $statement->bindParam(":appoint_date", $data['date']);
        $statement->bindParam(":appoint_time", $data['time']);

        try {
            $statement->execute();
            $result['id'] = $data['id'];
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }

    public function starAppointment()
    {
        $id = $_POST['id'];
        $sql = "UPDATE user_appointment
                SET user_appointment.appoint_star = 'yes'
                WHERE user_appointment.appoint_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $id);
        try {
            $statement->execute();
            $result['id'] = $id;
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }

    public function unStarAppointment()
    {
        $id = $_POST['id'];
        $sql = "UPDATE user_appointment
                SET user_appointment.appoint_star = 'no'
                WHERE user_appointment.appoint_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $id);
        try {
            $statement->execute();
            $result['id'] = $id;
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }

    public function setAppointmentStatus()
    {
        $id = $_POST['id'];
        $status = $_POST['status'];
        $sql = "UPDATE user_appointment
                SET user_appointment.appoint_status = :status
                WHERE user_appointment.appoint_id = :id";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(":id", $id);
        $statement->bindParam(":status", $status);
        try {
            $statement->execute();
            $result['id'] = $id;
            send_json(0, json_encode($result));
        } catch (PDOException $e) {
            send_json(2002, json_encode($e));
        }
    }
}

class AppointControl extends Sampyedhouse
{

    public function  __construct()
    {
        parent::__construct();
    }

    protected function getSqlStr($conditions)
    {
        $sql = "SELECT user_appointment.appoint_id,
                       user_appointment.appoint_user,
                       user_appointment.appoint_building,
                       user_appointment.appoint_address,
                       user_appointment.appoint_contact,
                       user_appointment.appoint_date,
                       user_appointment.appoint_time,
                       user_appointment.appoint_status,
                       user_appointment.appoint_star,
                       users_info.user_name,
                       users_info.user_title,
                       users_info.user_phone,
                       users_info.contacts_email,
                       building_product.building_name
                FROM user_appointment,users_info,building_product
                WHERE user_appointment.appoint_user = users_info.user_id
                AND user_appointment.appoint_building = building_product.building_id";
        if ($conditions['status'] != 0) {
            $sql .= " AND user_appointment.appoint_status = :status";
        }
        if ($conditions['star'] == 'true') {
            $sql .= " AND user_appointment.appoint_star = 'yes'";
        }
        $sql .= " ORDER BY user_appointment.appoint_id DESC";
        $statement = $this->db->prepare($sql);
        if ($conditions['status'] != 0) {
            $statement->bindParam(":status", $conditions['status']);
        }
        return $statement;
    }

}