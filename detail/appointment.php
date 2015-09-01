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
                    <button type="button" class="ui green button disabled" onclick="onUserInput(user.phoneNum)">获取验证码</button>
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

<div class="ui small modal" id="appointment-register">
    <div class="header">欢迎<span><!-- 这里需要显示称谓信息--></span>,您是首次登陆,我们需要一些信息</div>
    <div class="content">
        <div class="ui form">
            <div class="inline fields" id="register-phone">
                <div class="field">
                    <label>手机号: </label>
                </div>
                <div class="field">
                    <input type="text" readonly>
                </div>
                <div class="field">
                    <label class="disabled">此手机号将作为您的登陆账号以及主要联系方式</label>
                </div>
            </div>
            <h4 class="ui header dividing">个人信息</h4>

            <div class="inline fields" id="register-personal-info">
                <div class="field">
                    <label>称呼: </label>
                </div>
                <div class="field">
                    <input type="text" oninput="nameChaned(this.value,1)">
                </div>
                <div class="field">
                    <label>称谓: </label>
                </div>
                <div class="field">
                    <select class="ui dropdown" id="register-male" onchange="nameChaned(this.value,2)">
                        <option value="">选择一个称谓</option>
                        <option value="先生">先生</option>
                        <option value="女士">女士</option>
                    </select>
                </div>
            </div>
            <h4 class="ui dividing header">联系信息</h4>

            <div class="inline fields" id="register-contacts">
                <div class="field">
                    <label>邮箱地址: </label>
                    <input type="email" placeholder="必填,用于发送重要信息">
                </div>
                <div class="inline field">
                    <label>附加号码: </label>
                    <input type="text" placeholder="选填,用于备用联系">
                </div>
            </div>
            <h4 class="ui header dividing">团队信息</h4>

            <div class="inline field" id="register-team-type">
                <label class="selected selection">个人创业者 &nbsp;&nbsp;&nbsp;&nbsp;</label>

                <div class="ui slider checkbox">
                    <input type="checkbox">
                    <label>&nbsp;</label>
                </div>
                <label class="selection">团队创业</label>
            </div>
            <div class="ui field container">
                <label class="disabled">请选择您是个人创业者/团队代表,个人创业者日后能升级为公司,公司则无法修改</label>
            </div>
            <!-- 个人创业者需要填写-->
            <div class="inline personal field">

            </div>
            <!-- 团队需要填写-->
            <div class="inline team field" id="register-team-size">
                <label>团队规模</label>
                <select class="ui dropdown" id="team-size">
                    <option value="">选择当前规模</option>
                    <option value="1">10人以内</option>
                    <option value="2">10-20人</option>
                    <option value="3">20-50人</option>
                    <option value="4">50人以上</option>
                </select>
            </div>
            <div class="ui dividing header">附加信息</div>
            <div class="inline fields" id="register-extracts">
                <div class="field">
                    <label>地址: </label>
                </div>
                <div class="field">
                    <select class="ui dropdown">
                        <option value="">选择所在区</option>
                        <option value="310002">上城区</option>
                        <option value="310006">下城区</option>
                        <option value="310016">江干区</option>
                        <option value="310011">拱墅区</option>
                        <option value="310013">西湖区</option>
                        <option value="310051">滨江区</option>
                        <option value="311201">萧山区</option>
                        <option value="311100">余杭区</option>
                    </select>
                </div>
                <div class="five wide field">
                    <input type="text" placeholder="请填写详细地址">
                </div>
            </div>
            <div class="ui field container">
                <label class="disabled">默认地址. 是的,我们真的会专车接送</label>
            </div>
            <div class="ui inline field container" id="register-emailsupport">
                <div class="ui checkbox">
                    <input type="checkbox" checked>
                    <label>我希望能获得后续的创业帮助.</label>
                </div>
                <label class="disabled">我们可能会向您发送一些重要的创业资讯,您可以随时取消.</label>
            </div>
            <div class="ui inline field container" id="register-agreement">
                <div class="ui checkbox">
                    <input type="checkbox" checked>
                    <label>我同意 觅知空间 <a href="../about?target=agreement" target="_blank">
                            <使用许可协议>
                        </a>以及<a href="../about?target=silence" target="_blank">
                            <隐私条款>
                        </a></label>
                </div>
            </div>

        </div>
    </div>
    <div class="actions">
        <div class="ui cancel button">取消</div>
        <div class="ui primary button">登录</div>
    </div>

</div>


<script src="//static.dev.mzapp.info/client/js/appointment.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/client/js/appointuser.js" type="text/javascript"></script>
<script src="//static.dev.mzapp.info/public/services/smsServices.js" type="text/javascript"></script>