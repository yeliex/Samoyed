<?php

/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/11/8
 * Time: 下午5:09
 */
class Soft extends SampyedApphouse
{

    public function __construct()
    {
        parent::__construct();
    }

    public function checkUpdate()
    {
        $result = array();
        $result['version']['latest'] = SOFT_VERSION_LATEST;
        $result['version']['display'] = SOFT_VERSION_DISPLAY;
        $result['version']['min'] = SOFT_VERSION_MIN;
        $result['version']['max'] = SOFT_VERSION_MAX;
        $result['update']['mod'] = SOFT_UPDATE_MOD; // 1: 强制更新 2: 提示更新
        $result['update']['url'] = SOFT_UPDATE_URL;
        send_json(0, json_encode($result));
    }

    public function getUpdate($target)
    {
        $this->download(0,1);
    }

    public function download($version = 0,$target=0)
    {
        $url = SOFT_DOWNLOAD_URL_LATEST;
        switch ($version) {
            case 1:
                $url = SOFT_DOWNLOAD_URL_1;
                break;
            case "ios":
                $url = SOFT_UPDATE_URL_IOS;
                break;
            case "android":
                $url = SOFT_UPDATE_URL_ANDROID;
                break;
            default:
                $url = SOFT_DOWNLOAD_URL_LATEST;
                break;
        }
        if($target == 0)
        {
            send_json(0, json_encode(array("url" => $url)));
        }
        else {
            header($url);
        }
    }

}