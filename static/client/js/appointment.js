$(function () {
    // Init Appointment
    // 检测记录
    $("#appoint_loading").css("display", "block");
    $("#appoint_loading .status.loading").css("display", "block");
    var req = $.ajax(location.origin + "/api/appointment/logined", {
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
            }, 500);
        }
        else {
            // 有记录
            setTimeout(function () {
                logined(data.user_id);
            }, 500);
        }
    });
});

function logined(uid) {
    $("#appoint_loading .status.loading").hide();
    $("#appoint_loading .status.success").show();
    setTimeout(function () {
        loginSuccess(uid);
    }, 500);
}

function notLogined() {
    $("#appoint_loading .status.loading").hide();
    $("#appoint_loading .status.failed").show();
    setTimeout(function () {
        $("#appoint_loading").hide();
        $("#appoint_id").show();
    }, 500);
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
                $("#appoint_id .button").text("重新获取");
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
    var interval;
    this.currentTime = current;
    this.start = function () {
        // 开始倒计时
        interval = setInterval(function () {
            current--;
            if (current <= 0) {
                clearInterval(interval);
                $("#appoint_id .button").removeClass("disabled");
                $("#appoint_id input").removeAttr("readonly");
                $("#appoint_id .button").removeClass("loading");
            }
            $("#verify-code .label span").text(current);
        }, 1000);
        // 设置按钮为重新获取验证码
        $("#appoint_id .button").text("重新获取");
        if (!$("#appoint_id .button").hasClass("disabled")) {
            $("#appoint_id .button").addClass("disabled");
        }
        $("#appoint_id .button").removeClass("loading");
    };
    this.id =
        this.stop = function () {
            clearInterval(interval);
            $("#appoint_id .button").removeClass("disabled");
            $("#appoint_id input").removeAttr("readonly");
            $("#appoint_id .button").removeClass("loading");
        };
}

function onVerifyCodeInput(value) {
    $("#appoint_id .button").removeClass("loading");
    //$("#appoint_id .button").text("登录");
    $(".ui.message").removeClass("visible");
    if (value.length === 6) {
        // 验证码位数达到6位,开始验证
        $("#appoint_id .button").addClass("loading");
        $("#appoint_id input").attr("readonly", "readonly");
        if ($("#phoneNum").val() == user.phoneNum && value == user.varifyCode) {
            // 手机号与验证码正确正确
            onLogin(user.phoneNum);
        }
        else {
            // 显示一个错误
            $(".ui.message.varify").addClass("visible");
            // 重新允许输入
            $("#appoint_id input").removeAttr("readonly");
            $("#appoint_id .button").removeClass("loading");
        }
    }
    else {
        // 验证码小于6位->未输入完
    }
}

function onLogin(phoneNum) {
    // 登陆进程
    // UI相关设置
    // 设置按钮为不可点击,输入框只读,按钮进度条
    $("#appoint_id .button").addClass("disabled");
    $("#appoint_id .button").addClass("loading");
    $("#appoint_id input").attr("readonly", "readonly");

    // 检查用户是否已存在
    var req = $.ajax("http://api.mzapp.info/appointuser/userexisted", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            phone: phoneNum
        }
    });
    req.complete(function (returnData) {
        var data = $.parseJSON(returnData.responseText).overview;
        if (data.status === "success") {
            // 用户已存在
            userExisted(data.uid);
        }
        else {
            // 用户不存在
            userNotExisted(phoneNum);
        }
    });
}

function loginSuccess(uid) {
    // 登陆成功,进入预约流程
    // 显示预约信息
    $("#appoint_loading").hide();
    $("#appoint_id").hide();
    $("#appoint_info").show();

    // 设置预约信息
    setAppointmentUserInfo(uid);
    $("#appoint_info .save.button").click(function (e) {
        $(e.target).addClass('loading disabled');
        //$(e.target).attr('disabled', 'disabled');
        saveAppointment();
        console.log($(e.target));
        $(e.target).removeClass('loading');
        $(e.target).removeClass('disabled');
        $(e.target).removeAttr('disabled');
    });
}

function saveAppointment() {
    // 保存预约信息
    var data = getAppointmentData();

    var result = sendAppointment(data);
    if (result.status === "success") {
        alert("预约成功");
        alreadyAppointed();
    }
    else {
        appointmentFailed(result.overview.id);
        alert("预约失败,请重试: " + result.error_info);
        //location.reload();
    }
}

function getAppointmentData() {
    return {
        bid: getBID(),
        uid: $("#appoint_info .field.appoint.id label span").text(),
        uphone: $($("#appoint_info .field.appoint.contacts label span")[0]).text(),
        uaddress: $("#appoint_info .field.appoint.address label span").text(),
        ucontacts: {
            uemail: $($("#appoint_info .field.appoint.contacts label span")[1]).text(),
            uphone: $($("#appoint_info .field.appoint.contacts label span")[2]).text()
        },
        time: {
            date: getSelectedDate(),
            time: $("#time-select").dropdown('get text')
        }
    }
}

function getSelectedDate() {
    var dateSelected = $("#data-select").dropdown('get value');
    dateSelected = dateSelected.substr(0, (dateSelected.length - 1));
    var date = new Date();
    var dateCurrent = date.getDate();
    var monTmp;
    var dateStr = date.getFullYear() + ".";

    if (dateSelected < dateCurrent) {
        // 选择了下一个月
        monTmp = date.getMonth() + 2;
    }
    else {
        monTmp = date.getMonth() + 1;
    }

    dateStr += (monTmp.length === 2) ? monTmp : "0" + monTmp;
    dateStr += "." + ((dateSelected.length === 2) ? dateSelected : "0" + dateSelected);
    return dateStr;
}

function sendAppointment(data) {
    var result;
    var req = $.ajax("http://api.mzapp.info/appointment/saveAppointment?protocol=json", {
        method: "POST",
        async: false,
        data: data
    });
    req.complete(function (returnData) {
        result = $.parseJSON(returnData.responseText);
    });
    return result;
}

function appointmentFailed(id) {
    var req = $.ajax("http://api.mzapp.info/appointment/appointmentFailed", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function () {

    });
    return true;
}

function getAppointStatus(uid) {
    var result;
    var req = $.ajax("http://api.mzapp.info/appointment/alreadyAppointed", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            uid: uid,
            bid: getBID()
        }
    });
    req.complete(function (returnData) {
        result = $.parseJSON(returnData.responseText);
    });
    if (result.status === "success") {
        result = (result.overview.apointed === "yes");
    }
    else result = false;
    if (result) {
        alreadyAppointed();
    }
    return result;
}
function alreadyAppointed() {
    // 已预约
    $("#appoint_info .field").hide();
    $("#appoint_info .field.appoint.appointed").show();
}

function appoineEdit() {
    // 修改预约信息

    $($("#appointment-edit input")[1]).val($($("#appoint_info .field.appoint.contacts label span")[2]).text());
    $($("#appointment-edit input")[0]).val($("#appoint_info .field.appoint.address label span").text());
    $("#appointment-edit").modal('setting', 'closable', false).modal('show');
    $("#appointment-edit .actions .primary.button").click(function () {
        $($("#appoint_info .field.appoint.contacts label span")[2]).text($($("#appointment-edit input")[1]).val());
        $("#appoint_info .field.appoint.address label span").text($($("#appointment-edit input")[0]).val());
        $("#appointment-edit").modal('hide');
    });
    $("#appointment-edit .actions .cancel.button").click(function () {
        $("#appointment-edit").modal('hide');
    })

}