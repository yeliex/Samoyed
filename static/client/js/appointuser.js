function userExisted(a) {
    var b = $.ajax(location.origin + "/api/appointuser/userLogin?protocol=json", {
        method: "POST",
        async: false,
        data: {uid: a}
    });
    b.complete(function (c) {
        var d = $.parseJSON(c.responseText);
        if (d.status === "success") {
            loginSuccess(a)
        } else {
            alert("暂时无法登陆,请重试");
            window.location.reload()
        }
    })
}
function userNotExisted(a) {
    $("#register-male").dropdown();
    $("#team-size").dropdown();
    $("#register-team-type .ui.checkbox").checkbox({
        onChecked: function () {
            $("#appointment-register .personal").hide();
            $("#appointment-register .team").show();
            $("#appointment-register .selection").removeClass("selected");
            $($("#appointment-register .selection")[2]).addClass("selected")
        }, onUnchecked: function () {
            $("#appointment-register .team").hide();
            $("#appointment-register .personal").show();
            $("#appointment-register .selection").removeClass("selected");
            $($("#appointment-register .selection")[1]).addClass("selected")
        }
    });
    $("#register-extracts select").dropdown({direction: "upward"});
    $("#register-emailsupport .ui.checkbox").checkbox();
    $("#register-agreement .ui.checkbox").checkbox();
    $("#register-phone input").val(a);
    $("#appointment-register").modal("setting", "closable", false).modal("show");
    $("#appointment-register .actions .cancel.button").click(function () {
        window.location.reload()
    });
    $("#appointment-register .actions .primary.button").click(function () {
        var c = registerData();
        if (dataCheck(c)) {
            var b = dataSend(c);
            if (b.status === "success") {
                $("#appointment-register").modal("hide");
                userExisted(b.overview.uid)
            } else {
                registerFailed(b.overview.uid);
                alert("注册失败," + b.error_info);
                location.reload()
            }
        }
    })
}
function registerData() {
    return {
        phone: $("#register-phone input").val(),
        personal: {name: userName.name, title: userName.title},
        contacts: {email: $($("#register-contacts input")[0]).val(), phone: $($("#register-contacts input")[1]).val()},
        team: {
            team: (($("#register-team-type .ui.checkbox").checkbox("is checked")) ? "yes" : "no"),
            info: (($("#register-team-type .ui.checkbox").checkbox("is checked")) ? {size: $("#team-size").dropdown("get value")[0]} : {})
        },
        extract: {
            district: $($("#register-extracts input")[0]).val(),
            address: $($("#register-extracts input")[1]).val()
        },
        selection: {
            ads: (($("#register-emailsupport .ui.checkbox").checkbox("is checked")) ? "yes" : "no"),
            agreement: $("#register-agreement .ui.checkbox").checkbox("is checked")
        }
    }
}
function dataCheck(a) {
    if (a.personal.name == "" || a.personal.title == "") {
        alert("必须填写名字以及称谓");
        return false
    }
    if (a.contacts.email == "") {
        alert("邮箱为必填项");
        return false
    }
    if (a.selection.agreement === false) {
        alert("请同意许可协议");
        return false
    }
    if (a.team.info != "" && a.team.info.size == "") {
        alert("您选择了团队创业,请选择当前团队规模")
    }
    return true
}
function dataSend(c) {
    var a;
    var b = $.ajax("http://api.dev.mzapp.info/appointuser/userSave?protocol=json", {
        method: "POST",
        async: false,
        data: c
    });
    b.complete(function (d) {
        a = $.parseJSON(d.responseText)
    });
    return a
}
var userName = {name: "", title: ""};
function nameChaned(a, b) {
    switch (b) {
        case 1:
            userName.name = a;
            break;
        case 2:
            userName.title = a;
            break
    }
    if (userName.name !== "") {
        $("#appointment-register .header span").text(" " + userName.name + userName.title + " ")
    }
}
function registerFailed(b) {
    var a = $.ajax("http://api.dev.mzapp.info/appointuser/registerFailed?protocol=json", {
        method: "POST",
        async: false,
        data: {id: b}
    });
    a.complete(function () {
    });
    return true
}
function logout() {
    var a = $.ajax("http://api.dev.mzapp.info/appointuser/userLogout", {
        method: "GET",
        async: false,
        data: {protocol: "json"}
    });
    a.complete(function () {
        location.reload()
    });
    return true
}
function setAppointmentUserInfo(d) {
    if (!getAppointStatus(d)) {
        $("#appoint_info .field").hide();
        $("#appoint_info .field.appoint.loading").show();
        var e = getUserInfo(d);
        console.log(e);
        $("#appoint_info .field.appoint.id label span").text(e.user_id);
        $("#appoint_info .field.appoint.user label span").text(e.user_name);
        $("#appoint_info .field.appoint.address label span").text(e.extract_district + " " + e.extract_address);
        $($("#appoint_info .field.appoint.contacts label span")[0]).text(e.user_phone);
        $($("#appoint_info .field.appoint.contacts label span")[1]).text(e.contacts_email);
        (e.contacts_phone) ? ($($("#appoint_info .field.appoint.contacts label span")[2]).text(e.contacts_phone)) : ($($("#appoint_info .field.appoint.contacts label span")[2]).hide());
        var b = getDate();
        console.log(b);
        var a = "";
        for (var c = 0; c < 7; c++) {
            a += "<div class='item' value='" + b[c] + "'>" + b[c] + "号</div>"
        }
        a += "<div class='item' value='0'>其他</div>";
        $("#data-select .menu").html(a);
        $("#data-select").dropdown({
            onChange: function (f) {
                dataSelected(f)
            }, direction: "upward"
        }).dropdown("set selected", b[0] + "号");
        $("#time-select").dropdown("set selected", "上午").dropdown({direction: "upward"});
        $("#appoint_info .field").show();
        $("#appoint_info .field.appoint.loading").hide();
        $("#appoint_info .field.appoint.appointed").hide()
    }
}
function getUserInfo(a) {
    var c;
    var b = $.ajax("http://api.dev.mzapp.info/appointuser/userInfo", {
        method: "GET",
        async: false,
        data: {id: a, protocol: "json"}
    });
    b.complete(function (d) {
        c = $.parseJSON(d.responseText);
        if (c.status === "success") {
            c = c.overview
        } else {
            alert("用户信息获取失败,请重新登录");
            logout()
        }
    });
    return c
}
function getDate() {
    var c = new Date();
    var a = new Array();
    for (var d = 0; d < 7; d++) {
        var b = new Date();
        b.setDate((c.getDate() + (d + 1)));
        a[d] = b.getDate()
    }
    return a
}
function dataSelected(a) {
    console.log(a);
    if (a === "其他") {
        $("#time-select .menu").html("<div class='item' value='待定'>待定</div>");
        $("#time-select").dropdown("set selected", "待定").dropdown({direction: "upward"})
    } else {
        $("#time-select .menu").html("<div class='item' value='上午'>上午</div><div class = 'item'>下午</div><div class ='item'>晚上</div><div class='ui divider'></div><div class ='item'>待定</div>");
        $("#time-select").dropdown("set selected", "上午").dropdown({direction: "upward"})
    }
};