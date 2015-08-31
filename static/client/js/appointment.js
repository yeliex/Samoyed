$(function () {
    // Init Appointment
    // 检测记录
    $("#appoint_loading").css("display", "block");
    $("#appoint_loading .status.loading").css("display", "block");
    var req = $.ajax("http://api.dev.mzapp.info/appointment/ifuser", {
        method: "GET",
        data: {
            protocol: "json"
        }
    });
    req.complete(function (returnData) {
        var data = $.parseJSON(returnData.responseText).overview;
        if (data.user_status !== "success") {
            // 无记录
            setTimeout(function () {
                notLogined();
            }, 0);
        }
        else {
            // 有记录
            setTimeout(function () {
                logined(data.user_id);
            }, 0);
        }
    });
});

function logined(uid) {
    $("#appoint_loading .status.loading").hide();
    $("#appoint_loading .status.success").show();
    setTimeout(function () {
        $("#appoint_loading").hide();
        $("#appoint_info").show();
    }, 0);
}

function notLogined() {
    $("#appoint_loading .status.loading").hide();
    $("#appoint_loading .status.failed").show();
    setTimeout(function () {
        $("#appoint_loading").hide();
        $("#appoint_id").show();
    }, 0);
}

var user = {
    phoneNum: "",
    varifyCode: ""
};

function onUserInput(value) {
    // 一旦开始输入就需要关闭任何错误提示
    $("#appoint_id .button").removeClass("loading");
    $("#appoint_id .button").text("获取验证码");
    $(".ui.message").removeClass("visible");
    $(".ui.error.phone.message .header").text("手机号不合法");
    if (value.length === 11) {
        // 输入号码为11位,开始判断号码合法性
        if (phoneNumCheck(value)) {
            // 手机号正确
            user.phoneNum = value;
            // 开始请求
            // 设置按钮为加载
            $("#appoint_id .button").addClass("loading");
            $("#phoneNum").attr("readonly", "readonly");
            // 发送验证码
            var data = verifySend(value);
            if (data.status === "success") {
                // 发送成功
                $("#verify-code").show();
                $("#appoint_id .button").removeClass("loading");
                $("#appoint_id .button").removeClass("disabled");
                $("#appoint_id .button").text("登录");
                user.varifyCode = data.overview.varifyCode;
                $("#appoint_id input #phoneNum").removeAttr("readonly")
                // 设置倒计时
                var countDown = new SetCountDown();
                countDown.start();

            }
            else {
                // 发送失败
                // 设置错误提示
                $(".ui.error.phone.message .header").text(data.error_info);
                $(".ui.error.phone.message").addClass("visible");
                $("#phoneNum").removeAttr("readonly");
                $("#appoint_id .button").removeClass("loading");
                $("#appoint_id .button").text("获取验证码");
            }
        }
        else {
            // 手机号错误
            // 设置一个提示
            $(".ui.error.phone.message .header").text("手机号不合法");
            $(".ui.error.phone.message").addClass("visible");
        }
    }
    else {
        $("#verify-code").hide();
        $("#appoint_id .button").removeClass("loading");
        $("#appoint_id .button").text("获取验证码");
        $(".ui.message").removeClass("visible");
        $(".ui.error.phone.message .header").text("手机号不合法");
    }
}

function phoneNumCheck(num) {
    return (/^13\d{9}$/g.test(num) || (/^15\d{9}$/g.test(num)) || (/^18\d{9}$/g.test(num)))
}

function SetCountDown(target) {
    var initTime = 90;
    var current = initTime;
    var timeout;
    this.currentTime = current;
    this.start = function(){
        timeout = setTimeout(function () {
            current--;
            if(current <= 0){
                this.stop();
            }
            $("#verify-code .label span").text(current);
        }, 1000);
    };
    this.stop = function () {
        timeout.clearTimeout();
        $("#verify-code .label span").text(initTime);
    };
}

function onVerifyCodeInput(value) {
    $("#appoint_id .button").removeClass("loading");
    $("#appoint_id .button").text("登录");
    $(".ui.message").removeClass("visible");
    if (value.length === 6) {
        // 验证码位数达到6位,开始验证
        $("#appoint_id .button").addClass("loading");
        $("#appoint_id input").attr("readonly", "readonly");
        if (value === user.varifyCode && $("#phoneNum").val()===user.varifyCode) {
            // 验证码正确
        }
        else {
            // 显示一个错误
            $(".ui.message.varify").addClass("visible");
        }
    }
    else {

    }
}

function onLogin() {
    var code = $("#verify-code input").val();
    onVerifyCodeInput(code);
}