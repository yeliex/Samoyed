<?php
/**
 * Created by PhpStorm.
 * User: yeliex
 * Date: 15/8/2
 * Time: 下午8:31
 */
?>

<div class="ui small modal" id="loginBox">
    <div class="header">请登录</div>
    <div class="content">
        <form class="ui form">
            <div class="field">
                <div class="six wide field">
                    <div class="ui warning message">
                        <div class="header" id="alert"></div>
                    </div>
                </div>
            </div>
            <div class="field">
                <div class="six wide field">
                    <input type="text" id="user" placeholder="用户名">
                </div>
            </div>
            <div class="field">
                <div class="six wide field">
                    <input type="password" id="password" placeholder="密码">
                </div>
            </div>
        </form>
    </div>
    <div class="actions">
        <div class="six wide field">
            <div class="ui primary button" id="login">登录</div>
        </div>
    </div>
</div>

<div class="ui basic small modal" id="loginSuccess">
    <div class="header">登陆成功</div>
    <div class="header">欢迎回来, <span></span></div>
</div>

<div class="ye-nav">
    <div class="ui grey inverted fixed top large menu">
        <div class="ui container">
            <a class="item">
                <i class="dashboard icon"></i>
                觅知空间管理系统
            </a>

            <div class="right menu">
                <div class="small item" id="nav-time"></div>
                <div class="small item" id="user-name">您已作为 <span></span> 登录</div>
                <a class="item" title="退出登录" onclick="logout()">
                    <i class="sign out icon"></i>
                </a>
            </div>
        </div>
    </div>
</div>
<div class="ui container ye-main">
    <div class="ui pointing secondary menu">
        <div class="item" data-tab="indexPage">首页</div>
        <div class="item permession newBill" data-tab="newBillPage">新房源</div>
        <div class="item permission billManager" data-tab="billManagerPage">房源管理</div>
        <div class="item permission appointmentManagerPage" data-tab="appointManagerPage">预约管理</div>
        <div class="item permission userManager" data-tab="userManagerPage">用户管理</div>
        <div class="item" data-tab="messagePage">内部消息</div>
        <div class="item permission workerManager" data-tab="workerManagerPage">员工管理</div>
    </div>
    <div class="ui tab" data-tab="indexPage">
    </div>
    <div class="ui tab" data-tab="newBillPage">
    </div>
    <div class="ui tab" data-tab="billManagerPage">
    </div>
    <div class="ui tab" data-tab="appointManagerPage">
    </div>
    <div class="ui tab" data-tab="messagePage">
    </div>
    <div class="ui tab" data-tab="userManagerPage">
    </div>
    <div class="ui tab" data-tab="workerManagerPage">
    </div>
</div>
