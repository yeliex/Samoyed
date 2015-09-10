<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/14
 * Time: 下午4:18
 */

use Qiniu\Auth;

class Imageupload extends Sampyedhouse{

    protected $accessKey = 'vufCVXS05a3Xrxajk2HAvX-eoTYxkFRNoCOj1GhB';
    protected $secretKey = '7Fh1ZpZJTI3u4Y6egEsb_PkmWwSK7NyuvV8clXg5';
    protected  $token;

    public function  __construct()
    {
        parent::__construct();


    }

    function token(){

        $bucket = $_GET['bucket'];
        if(empty($bucket))
        {
            $bucket = 'mzstatic';
        }
        $auth = new Auth($this->accessKey, $this->secretKey);
        $this->token = $auth->uploadToken($bucket);
        $value = array();
        $value['uptoken'] = $this->token;
        $value['result'] = "success";
        $str = json_encode($value);
        echo $str;
    }
}