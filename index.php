<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/28
 * Time: 上午11:53
 */
$time = date('Ymdhis000');
print_r(date('y.m.d'));

$a = array();
$a['to'] = array('yeliex@yeliex.com');
$a['sub'] = array();
$a['sub']['user'] = array('yeliex');
$a['sub']['phone'] = array('15988545765');
$a['sub']['contact_phone'] = array('87172313');
$a['sub']['mail'] = array('yeliex@yeliex.com');
$a['sub']['address'] = array('杭州市');


print_r(json_encode($a));