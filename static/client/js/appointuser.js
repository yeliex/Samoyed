// 预约模块子模块: 用户信息处理
function userExisted(uid) {
    // 用户已存在,直接登陆
    var req = $.ajax("http://api.dev.mzapp.info/appointuser/userLogin?protocol=json", {
        method: "POST",
        data: {
            uid: uid
        }
    });
    req.complete(function (returnData) {
        var data = $.parseJSON(returnData.responseText);
        if (data.status === "success") {
            // 登陆成功
            loginSuccess(uid);
        }
        else {
            // 登陆失败
            alert("暂时无法登陆,请重试");
            window.location.reload();
        }
    });
}
function userNotExisted(phone) {
    // 用户不存在,需要完善注册信息

    // 初始化注册信息完善
    // 称谓
    $("#register-male").dropdown();
    // 团队规模
    $("#team-size").dropdown();
    //  团队类型: 个人创业/团队
    $("#register-team-type .ui.checkbox").checkbox({
        onChecked: function () {
            // 选择团队
            $("#appointment-register .personal").hide();
            $("#appointment-register .team").show();
            $("#appointment-register .selection").removeClass("selected");
            $($("#appointment-register .selection")[2]).addClass("selected");

        },
        onUnchecked: function () {
            // 选择个人
            $("#appointment-register .team").hide();
            $("#appointment-register .personal").show();
            $("#appointment-register .selection").removeClass("selected");
            $($("#appointment-register .selection")[1]).addClass("selected");
        }
    });
    // 附加信息: 地址
    $("#register-extracts select").dropdown();
    // 附加信息: 邮件支持以及隐私条款
    $("#register-emailsupport .ui.checkbox").checkbox();
    $("#register-agreement .ui.checkbox").checkbox();
    // 手机号码
    $("#register-phone input").val(phone);

    // 显示注册信息完善modal
    $("#appointment-register").modal('setting', 'closable', false).modal('show');

}

function loginSuccess(uid) {
    // 登陆成功,进入预约流程
    // 打开设置框 不允许用户自主关闭
    $("#appointment-register").modal('setting', 'closable', false).modal('show');
    $("#appointment-register .actions .cancel.button").click(function () {
        window.location.reload(); // 既然不肯注册那就直接刷新好了 6
    });
    $("#appointment-register .actions .primary.button").click(function () {
        window.location.reload(); // 既然不肯注册那就直接刷新好了 6
    });
}

var userName = {
    name: "",
    title: ""
};

function nameChaned(value, target) {
    switch (target) {
        case 1:
        {
            // 名字改变
            userName.name = value;
            break;
        }
        case 2:
        {
            // 称谓改变
            userName.title = value;
            break;
        }
    }
    if (userName.name !== "") {
        $("#appointment-register .header span").text(" " + userName.name + userName.title + " ");
    }
}

function getExistUserInfo() {

}