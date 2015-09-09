// 预约模块子模块: 用户信息处理
function userExisted(uid) {
    // 用户已存在,直接登陆
    var req = $.ajax(location.origin + "/api/appointuser/userLogin?protocol=json", {
        method: "POST",
        async: false,
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

    $("#appointment-register .actions .cancel.button").click(function () {
        window.location.reload(); // 既然不肯注册那就直接刷新好了 6
    });
    $("#appointment-register .actions .primary.button").click(function () {
        // 点击注册按钮
        // 获取输入数据
        var data = registerData();
        if (dataCheck(data)) {
            var result = dataSend(data);
            // result为注册结果集
            if (result.status === "success") {
                // 注册成功
                // 关闭modal
                $("#appointment-register").modal("hide");
                // 进入登录进程
                userExisted(result.overview.uid);
            }
            else {
                // 返回注册失败
                registerFailed(result.overview.uid);
                alert("注册失败," + result.error_info);
                location.reload();
            }
        }
    });
}

function registerData() {
    return {
        phone: $("#register-phone input").val(),
        personal: {
            name: userName.name,
            title: userName.title
        },
        contacts: {
            email: $($("#register-contacts input")[0]).val(),
            phone: $($("#register-contacts input")[1]).val()
        },
        team: {
            team: (($("#register-team-type .ui.checkbox").checkbox('is checked')) ? "yes" : "no"), // yes为团队创业,no为个人
            info: (($("#register-team-type .ui.checkbox").checkbox('is checked')) ? {size: $("#team-size").dropdown('get value')[0]} : {})

        },
        extract: {
            district: $("#register-extracts .ui.dropdown").dropdown('get text'),
            address: $("#register-extracts input").val()
        },
        selection: {
            ads: (($("#register-emailsupport .ui.checkbox").checkbox('is checked')) ? "yes" : "no"),
            agreement: $("#register-agreement .ui.checkbox").checkbox('is checked')
        }
    };
}

function dataCheck(data) {
    if (data.personal.name == "" || data.personal.title == "") {
        alert("必须填写名字以及称谓");
        return false;
    }
    if (data.contacts.email == "") {
        alert("邮箱为必填项");
        return false;
    }
    if (data.selection.agreement === false) {
        alert("请同意许可协议");
        return false;
    }
    if (data.team.info != "" && data.team.info.size == "") {
        alert("您选择了团队创业,请选择当前团队规模");
    }
    return true;
}

function dataSend(data) {
    var result;
    var req = $.ajax("http://api.dev.mzapp.info/appointuser/userSave?protocol=json", {
        method: "POST",
        async: false,
        data: data
    });
    req.complete(function (returnData) {
        result = $.parseJSON(returnData.responseText);
    });
    return result;
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

function registerFailed(id) {
    var req = $.ajax("http://api.dev.mzapp.info/appointuser/registerFailed?protocol=json", {
        method: "POST",
        async: false,
        data: {
            id: id
        }
    });
    req.complete(function () {

    });
    return true;
}

function logout() {
    var req = $.ajax("http://api.dev.mzapp.info/appointuser/userLogout", {
        method: "GET",
        async: false,
        data: {
            protocol: "json"
        }
    });
    req.complete(function () {
        location.reload();
    });
    return true;
}

function setAppointmentUserInfo(uid) {
    // 先确认是否已预约
    if (!getAppointStatus(uid)) {
        // false 则未预约
        // 只显示加载界面
        $("#appoint_info .field").hide();
        $("#appoint_info .field.appoint.loading").show();
        var data = getUserInfo(uid);
        console.log(data);

        // 设置数据
        $("#appoint_info .field.appoint.id label span").text(data.user_id);
        $("#appoint_info .field.appoint.user label span").text(data.user_name);
        $("#appoint_info .field.appoint.address label span").text(data.extract_district + " " + data.extract_address);
        $($("#appoint_info .field.appoint.contacts label span")[0]).text(data.user_phone);
        $($("#appoint_info .field.appoint.contacts label span")[1]).text(data.contacts__email);
        (data.contacts_phone) ? ($($("#appoint_info .field.appoint.contacts label span")[2]).text(data.contacts_phone)) : ($($("#appoint_info .field.appoint.contacts label span")[2]).hide());

        // 设置时间
        var date = getDate();
        console.log(date);
        var dateStr = "";
        for (var i = 0; i < 7; i++) {
            dateStr += "<div class='item' value='" + date[i] + "'>" + date[i] + "号</div>"
        }
        dateStr += "<div class='item' value='0'>其他</div>";
        $("#data-select .menu").html(dateStr);
        $("#data-select").dropdown({
            onChange: function (text) {
                dataSelected(text);
            },
            direction: "upward"
        }).dropdown('set selected', date[0] + "号");
        $("#time-select").dropdown('set selected', "上午").dropdown({
            direction: "upward"
        });

        // 数据设置完成,加载隐藏其他显示
        $("#appoint_info .field").show();
        $("#appoint_info .field.appoint.loading").hide();
        $("#appoint_info .field.appoint.appointed").hide();
    }
}

function getUserInfo(uid) {
    var data;
    var req = $.ajax("http://api.dev.mzapp.info/appointuser/userInfo", {
        method: "GET",
        async: false,
        data: {
            id: uid,
            protocol: "json"
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status === "success") {
            data = data.overview;
        }
        else {
            // 没有获取到用户数据,退出然后刷新页面
            alert("用户信息获取失败,请重新登录");
            logout();
        }
    });
    return data;
}

function getDate() {
    var date = new Date();
    var dataArray = new Array();
    for (var i = 0; i < 7; i++) {
        var tmpDate = new Date();
        tmpDate.setDate((date.getDate() + (i + 1)));
        dataArray[i] = tmpDate.getDate();
    }
    return dataArray;
}
function dataSelected(text) {
    console.log(text);
    if (text === "其他") {
        $("#time-select .menu").html("<div class='item' value='待定'>待定</div>");
        $("#time-select").dropdown('set selected', "待定").dropdown({
            direction: "upward"
        });
    }
    else {
        $("#time-select .menu").html("<div class='item' value='上午'>上午</div><div class = 'item'>下午</div><div class ='item'>晚上</div><div class='ui divider'></div><div class ='item'>待定</div>");
        $("#time-select").dropdown('set selected', "上午").dropdown({
            direction: "upward"
        });
    }
}
