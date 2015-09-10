<?php

class Login extends Sampyedhouse
{
    private $user;
    private $password;
    private $userid;

    public function  __construct()
    {

        parent::__construct();

        // 登录
        // 判断参数
        if ((!isset($_POST['user'])) || ($_POST['user'] == "")) {
            // 判断是否已登录,不需要初始化参数
        } else {
            // 登录操作,需要获取数据
            // 获取用户名参数
            if ((!isset($_POST['user'])) || ($_POST['user'] == "")) {
                // 没有用户名参数
                send_json(1011); // 错误: 用户名或密码不能为空
                exit;
            }
            $this->user = $_POST['user'];

            // 获取密码参数
            if ((!isset($_POST['password'])) || ($_POST['password'] == "")) {
                // 没有用户名参数
                send_json(1012); // 错误: 用户名或密码不能为空
                exit;
            }
            $this->password = $_POST['password'];
        }
    }

    public function iflogin()
    {

        session_start();

        // 方法: 判断是否已登录
        $user = $_SESSION['user'];
        $result = array();
        $result['login_status'] = 'failed';
        $result['uid'] = "";
        $result['user'] = "";

        if (isset($user) && ($user != "")) {
            // Session 中存在用户名,已登录
            $userid = $_SESSION['userid'];
            $result['login_status'] = 'success';
            $result['uid'] = $userid;
            $result['user'] = $_SESSION['user'];
        }
        // 未登录则发送failed
        // 否则发送success
        send_json(0, json_encode($result));
    }

    public function  defaultAction()
    {
        // 判断用户名/密码是否为空
        if ($this->user == "") {
            send_json(1011); // 错误: 用户名或密码不能为空
            exit;
        } else if ($this->password == "") {
            send_json(1012); // 错误: 用户名或密码不能为空
            exit;
        }

        // 默认操作: 登录
        $returnData = array();
        $returnData['login_status'] = "failed";
        $returnData['uid'] = "";
        $returnData['user'] = "";
        $returnData['session'] = "";
        $error_code = 1013;
        // 数据库查询密码
        $sql = "SELECT uid AS uid,
                       password AS password,
                       username AS user
                       FROM admin_users
                       WHERE username = :user
                       OR email = :user";
        $statement = $this->db->prepare($sql);
        $statement->bindParam(':user', $this->user);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);
//        $result = $statement->fetchAll();

        if ($result) {
            if (sha1($this->password) === $result['password']) {
                // 密码符合
                $this->userid = $result['uid'];
                $this->user = $result['user'];
                $returnData['login_status'] = "success";

                $returnData['uid'] = $this->userid;
                $returnData['user'] = $this->user;
                $error_code = 0;

                session_start();
                // 写入登录信息到session
                $_SESSION['user'] = $this->user;
                $_SESSION['userid'] = $this->userid;
            }
        }
        // 用户不存在/密码错误,直接返回Error 1013,用户名或密码错误
        // 否则返回error 0, 成功


        send_json($error_code, json_encode($returnData));
    }

    public function logout(){
        session_start();
        session_destroy();
        $result = array();
        $result['logout_status'] = "success";
        send_json(0,json_encode($result));
    }
}