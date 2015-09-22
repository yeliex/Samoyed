$(function () {

    var req = $.ajax(location.origin + '/api/login/iflogin/', {
        method: "GET",
        data: {
            protocol: 'json'
        }
    });
    req.complete(function (returnData) {
        ifLogin($.parseJSON(returnData.responseText));
    });

});

function ifLogin(returnData) {
    // 获取登录状态
    var status = returnData.status;
    var login_status = returnData.data.login_status;
    var error_info = "";
    if (status == 'failed' || login_status == 'failed') {
        // 获取失败
        if (login_status == 'failed') {
            error_info = "未登录";
        }
        else {
            error_info = returnData.error_info;
        }
        loginDisplay(error_info);
    }
    else {
        // 已登录
        logined(returnData.data.uid, returnData.data.user);
    }
}

function loginDisplay(error_info) {
    if (!error_info) {
        error_info = "请登录";
    }
    $("#loginProgress").modal('hide');
    $("#loginBox .actions .primary.button#login").html("登录");
    $("#loginBox .actions .primary.button#login").removeClass("loading");
    $("#loginBox #alert").text(error_info);
    $("#loginBox #alert").parent().addClass('visible');
    $("#loginBox").modal('setting', 'closable', false).modal('show');
}

$(function () {
    // 检测点击登录
    $('#login').click(function () {
        var user = $('#user').val();
        var password = $('#password').val();
        var postData = {
            'user': user,
            'password': password
        };
        $("#loginBox #alert").parent().removeClass('visible');
        $("#loginBox .actions .primary.button#login").addClass("loading");

        var req = $.ajax(location.origin + '/api/login?protocol=json', {
            method: "POST",
            data: postData
        });

        req.complete(function (returnData) {
            setTimeout(function () {
                loginResult($.parseJSON(returnData.responseText));
            }, 1000);
        });
    });
});

function loginResult(returnData) {
    if (returnData.status === 'failed' || returnData.data.login_status === 'failed') {
        // 登录失败
        loginDisplay(returnData.error_info);
    }
    else {
        // 登录成功
        logined(returnData.data.uid, returnData.data.user);
    }
}

function logined(uid, user) {
    $("#loginBox").modal('hide');
    // 显示欢迎信息
    $("#loginSuccess .header span").html(user);
    $("#loginSuccess").modal('setting', 'closable', false).modal('show');

    setTimeout(function () {
        $("#loginSuccess").modal('hide');
    }, 1000);

    // 设置页面显示用户信息
    $(".ye-nav #user-name span").text(user);
    setInterval(function () {
        var datetime = new Date();
        $(".ye-nav #nav-time").text(
            datetime.getFullYear() + "-"
            + (datetime.getMonth() + 1) + "-"
            + datetime.getDate() + "   "
            + datetime.getHours() + ":"
            + datetime.getMinutes() + ":"
            + datetime.getSeconds());
    }, 1000);
}

function logout() {
    var req = $.ajax(location.origin + '/api/login/logout', {
        method: "GET",
        data: {
            protocol: 'json'
        }
    });
    req.complete(function () {
        location.reload();
    });
}