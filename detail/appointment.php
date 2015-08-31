<div class="ui container appointment">
    <div class="ui grid">
        <div class="four wide right floated column appointment-wrapper">
            <!--                    <div class="appointment-wrapper">-->
            <div class="appointment-preview">
            </div>
            <h1>登记看房</h1>

            <form class="ui form" id="appoint_loading">
                <div class="status loading">
                    <div class="ui active text loader">正在读取用户数据</div>
                </div>
                <div class="status success">
                    <i class="checkmark icon"></i>

                    <p>登录成功</p>
                </div>
                <div class="status failed">
                    <i class="remove icon"></i>

                    <p>未获取到用户信息</p>
                </div>
            </form>

            <form class="ui form" id="appoint_id">
                <div class="field">
                    <input type="text" autofocus placeholder="请输入手机号" maxlength="11" oninput="onUserInput(this.value)"
                           id="phoneNum">
                    <label class="disabled">新用户将会自动注册</label>
                </div>
                <div class="ui error phone message">
                    <div class="header">手机号不合法</div>
                </div>
                <div class="field" id="verify-code">
                    <div class="ui right labeled input">
                        <input type="text" maxlength="6" placeholder="验证码" id="varifyCodeInput"
                               oninput="onVerifyCodeInput(this.value)">

                        <div class="ui label"><span>90</span>s</div>
                    </div>
                </div>
                <div class="ui error varify message">
                    <div class="header">验证码错误</div>
                </div>
                <div class="field">
                    <button type="button" class="ui green button disabled"
                    ">获取验证码</button>
                </div>
            </form>

            <form class="ui form" id="appoint_info">
                <div class="field" id="building_name">
                    <label>想看的房子: <span></span></label>
                </div>
                <div class="required field">
                    <div class="ui action input ">
                        <input type="text" id="user_name" maxlength="10" placeholder="联系人">
                        <select class="ui compact selection dropdown">
                            <option value="">称谓</option>
                            <option value="先生">先生</option>
                            <option value="女士">女士</option>
                            <option value="小姐">小姐</option>
                        </select>
                    </div>
                </div>
                <div class="required field">
                    <div class="ui icon input loading" id="user_phone">
                        <input type="text" maxlength="11" placeholder="输入手机号获取记录" autofocus
                               onkeyup="value=value.replace(/[^0-9]/ig, ''); " oninput="getUserInfo(this)">
                        <i class="search icon"></i>
                    </div>
                </div>
                <div class="required field">
                    <div class="ui icon input loading" id="user_mail">
                        <input type="email" placeholder="请输入正确邮箱" oninput="getUserInfo(this)">
                        <!--                            <i class="lose icon"></i>-->
                    </div>
                </div>
                <div class="field">
                    <label>预约看房时间: </label>

                    <div class="ui icon buttons right" id="data-time-select">
                        <div class="ui top right floating dropdown labeled search icon button"
                             id="data-select">
                            <i class="calendar icon"></i>
                            <span class="text">日期</span>

                            <div class="menu">
                                <div class="item">22号</div>
                                <div class="item">23号</div>
                                <div class="item">24号</div>
                                <div class="item">25号</div>
                                <div class="item">26号</div>
                                <div class="item">27号</div>
                                <div class="item">28号</div>
                                <div class="ui divider"></div>
                                <div class="item">其他</div>
                            </div>
                        </div>
                        <div class="ui top left dropdown button" id="time-select">
                            <span class="text">时间</span>

                            <div class="menu" id="time-select-menu">
                                <div class="item">上午</div>
                                <div class="item">下午</div>
                                <div class="item">晚上</div>
                                <div class="ui divider"></div>
                                <div class="item">待定</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui divider"></div>
                <div class="field right">
                    <button type="button" class="ui button blue">提交</button>
                </div>
                <div class="field right">
                    <div class="ui mini buttons">
                        <button type="button" class="ui button green">查看所有预约</button>
                        <div class="or" data-text="或"></div>
                        <button type="button" class="ui button green">联系我们</button>
                    </div>
                </div>
                <div class="ui success message">
                    <i class="close icon"></i>

                    <p>已自动为您填入历史号码,请核对</p>
                </div>
                <div class="ui error message" id="user_phone_error">
                    <!--                        <i class="close icon"></i>-->
                    <p>手机号格式错误</p>
                </div>
                <div class="ui success message">
                    <i class="close icon"></i>

                    <p>已自动为您填入历史号码,请核对</p>
                </div>
            </form>
            <!--                    </div>-->

        </div>

    </div>
</div>
<script src="//static.dev.mzapp.info/client/js/appointment.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/public/services/smsServices.js" type="text/javascript"></script>