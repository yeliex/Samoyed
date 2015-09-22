var appointConditions = {
    status: 0,
    star: false
};
$(function () {
    $("#appoint_manager #select-star").checkbox({
        onChange: function () {
            getList();
        }
    });
    $("#appoint_manager #select-status .ui.dropdown").dropdown({
        onChange: function () {
            getList();
        }
    });
    getList();
});
function getList() {
    var data;

    // 设置全局变量: appointConditions
    appointConditions.status = $("#appoint_manager #select-status .ui.dropdown").dropdown('get value')[0];
    appointConditions.star = $("#appoint_manager #select-star").checkbox('is checked');

    var req = $.ajax("http://api.panel.mzapp.info/appointmanager/appointlist/", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            status: appointConditions.status,
            star: appointConditions.star
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
        else {
            // 显示信息
            $($("#appoint_manager #list_num span")[0]).text(data.data.length);
            displayList(data.data);
        }
    });
    appointmentNum(); // 设置熟练
}

function appointmentNum() {
    $.ajax("http://api.panel.mzapp.info/appointmanager/appointNum/", {
        method: "GET",
        data: {
            protocol: "json"
        }
    }).complete(function (returnDate) {
        var rData = $.parseJSON(returnDate.responseText);
        if (rData.status != "success") {
            alert("获取失败,请重试\n\n" + rData.error_info);
        }
        else {
            $($("#appoint_manager #list_num span")[1]).text(rData.data.total);
            $($("#appoint_manager #list_num span")[2]).text(rData.data.new);
        }
    });
}

function displayList(data) {
    var str = "";
    for (var i = 0; i < data.length; i++) {
        str += appointListStr(data[i]);
    }
    $("#appoint_manager #appoint_list tbody").html(str);
    for (var i = 0; i < data.length; i++) {
        activeDrop(data[i].appoint_id);
    }
}

function appointListStr(data) {
    var appoint = new AppointmentData(data);
    var str = "<tr id=" + appoint.id + ">";
    str += "<td>" + appoint.id + "</td><td>" + appoint.buildingNameDisplay + "</td><td>" + appoint.userNameDisplay + "</td><td>" + appoint.contacts + "</td><td>" + appoint.address + "</td><td>" + appoint.appointDateTime + "</td>";
    str += "<td><div class='ui green small buttons edit'>";
    str += "<div class='ui button primary'>修改</div>";
    str += "<div class='ui floating dropdown icon button'><i class='dropdown icon'></i>";
    str += "<div class='menu'>";
    str += "<div class='item basic' data-value='preview-building'>查看房源详情页</div>";
    str += "<div class='item basic' data-value='preview-user'>查看用户信息</div>";
    str += "<div class='divider'></div>";
    str += "<div class='item basic' data-value='edit-basic'>修改预约信息</div>";
    str += "<div class='divider'></div>";
    str += "<div class='item remove' data-value='edit-remove'>删除</div>";
    str += "</div></div></div></td>";
    str += "<td><div class='ui green small buttons edit'>";

    if (nextStatus(appoint.status) == null) {
        str += "<div class='ui button disabled'>" + getStatu(appoint.status) + "</div>";
    }
    else {
        str += "<div class='ui button primary next'>" + nextStatus(appoint.status) + "</div>";
    }

    str += "</div></td>";
    str += "<td><div class='ui checkbox'><input type='checkbox' " + ((appoint.star == 'yes') ? ('checked') : ('')) + "><label></label></div></td>";
    str += "</tr>";
    return str;
}

function AppointmentData(data) {
    this.id = data.appoint_id;
    this.user = data.appoint_user;
    this.userName = data.user_name;
    this.userTitle = data.user_title;
    this.userNameDisplay = data.user_name + " " + data.user_title + "<br>" + data.appoint_user;
    this.building = data.appoint_building;
    this.buildingName = data.building_name;
    this.buildingNameDisplay = data.building_name + "<br>" + data.appoint_building;
    this.phone = data.user_phone;
    this.email = data.contacts_email;
    this.address = data.appoint_address;
    this.contachPhone = data.appoint_contact;
    this.contacts = data.user_phone + "/" + data.appoint_contact + "<br>" + data.contacts_email;
    this.appointDate = data.appoint_date;
    this.appointTime = data.appoint_time;
    this.appointDateTime = data.appoint_date + "<br>" + data.appoint_time;
    this.status = data.appoint_status;
    this.statusDisplay = getStatu(data.appoint_status) + "/" + nextStatus(data.appoint_status);
    this.star = data.appoint_star;
}

function activeDrop(id) {
    $("#appoint_manager #appoint_list #" + id + " .button.next").click(function ($e) {
        var target = $($e.target).text();
        switch (target) {
            case "确认":
            {
                target = "2";
                break;
            }
            case "看房":
            {
                target = "3";
                break;
            }
            default:
            {
                target = "1";
                break;
            }
        }
        $.ajax("http://api.panel.mzapp.info/appointmanager/setAppointmentStatus/?protocol=json", {
            method: "POST",
            data: {
                id: id,
                status: target
            }
        }).complete(function (returnDate) {
            var data = $.parseJSON(returnDate.responseText);
            if (data.status != "success") {
                alert("修改状态失败,请重试\n\n" + data.error_info);
            }
            getList();
        });

    });
    $("#appoint_manager #appoint_list #" + id + " .ui.dropdown").dropdown({
        onChange: function (value) {
            switch (value) {
                case "preview-building":
                {
                    // 打开详情页
                    previewBuilding(id);
                    break;
                }
                case "preview-user":
                {
                    // 查看用户信息
                    previewUser(id);
                    break;
                }
                case "edit-basic":
                {
                    // 编辑信息
                    editAppointment(id);
                    break;
                }
                case "edit-remove":
                {
                    // 删除当前用户
                    removeAppointment(id);
                    break;
                }
            }
        }
    });
    $("#appoint_manager #appoint_list #" + id + " .ui.checkbox").checkbox({
        onChecked: function () {
            $.ajax("http://api.panel.mzapp.info/appointmanager/starAppointment/?protocol=json", {
                method: "POST",
                data: {
                    id: id
                }
            }).complete(function (returnDate) {
                var data = $.parseJSON(returnDate.responseText);
                if (data.status != "success") {
                    alert("添加星标失败,请重试\n\n" + data.error_info);
                }
                getList();
            });
        },
        onUnchecked: function () {
            $.ajax("http://api.panel.mzapp.info/appointmanager/unStarAppointment/?protocol=json", {
                method: "POST",
                data: {
                    id: id
                }
            }).complete(function (returnDate) {
                var data = $.parseJSON(returnDate.responseText);
                if (data.status != "success") {
                    alert("删除星标失败,请重试\n\n" + data.error_info);
                }
                getList();
            });
        }
    });
}

function previewBuilding(id) {
    var bid = $($("#appoint_manager #appoint_list #" + id + " td")[1]).html().split("<br>")[1];
    window.open("http://mizhi.pub/detail?id=" + bid);
}
function previewUser(id) {
    var uid = $($("#appoint_manager #appoint_list #" + id + " td")[2]).html().split("<br>")[1];
    $.ajax("http://api.panel.mzapp.info/usermanager/userInfo", {
        method: "GET",
        data: {
            protocol: "json",
            id: uid
        }
    }).complete(function (returnDate) {
        var data = $.parseJSON(returnDate.responseText);
        if (data.status != "success" || data.data == false) {
            alert("获取信息失败,请重试\n\n" + data.error_info);
        }
        else {
            data = data.data;
            // 显示用户信息
            alert("用户ID: " + data.user_id + "\n\n用户名: " + data.user_name + "\n\n手机号: " + data.user_phone + "\n\n邮箱: " + data.contacts_email + " 备用号码: " + data.contacts_phone + "\n\n地址: " + data.extract_district + " " + data.extract_address + "\n\n注册日期: " + data.reg_date + " 允许广告: " + data.selection_ads);
        }
    });
}

function editAppointment(id) {

    $("#edit_appointment .header span").text(id);
    $($("#edit_appointment .content input")[0]).val($($("#appoint_manager #appoint_list #" + id + " td")[3]).html().split("<br>")[0].split("/")[1]);
    $($("#edit_appointment .content input")[1]).val($($("#appoint_manager #appoint_list #" + id + " td")[4]).text());
    $($("#edit_appointment .content input")[2]).val($($("#appoint_manager #appoint_list #" + id + " td")[5]).html().split("<br>")[0]);
    $($("#edit_appointment .content input")[3]).val($($("#appoint_manager #appoint_list #" + id + " td")[5]).html().split("<br>")[1]);

    $("#edit_appointment").modal('setting', 'closable', false).modal('show');

    $("#edit_appointment .actions .primary.button").click(function () {
        var data = {
            id: id,
            contact: $($("#edit_appointment .content input")[0]).val(),
            address: $($("#edit_appointment .content input")[1]).val(),
            date: $($("#edit_appointment .content input")[2]).val(),
            time: $($("#edit_appointment .content input")[3]).val()
        };

        $.ajax("http://api.panel.mzapp.info/appointmanager/editAppointment/?protocol=json", {
            method: "POST",
            data: data
        }).complete(function (returnDate) {
            var tmp = $.parseJSON(returnDate.responseText);
            if (tmp.status !== "success") {
                alert("修改失败,请重试:" + tmp.error_info);
            }
            getList();
        });

        $("#edit_appointment").modal('hide');
    });
    $("#edit_appointment .actions .cancel.button").click(function () {
        $("#edit_appointment").modal('hide');
    })
}

function removeAppointment() {
    if (confirm("是否要删除预约: " + id + "\n\n此操作将不可恢复")) {
        $.ajax("http://api.panel.mzapp.info/appointmanager/removeAppointment/?protocol=json", {
            method: "POST",
            data: {
                id: id
            }
        }).complete(function (returnDate) {
            var data = $.parseJSON(returnDate.responseText);
            if (data.status != "success") {
                alert("删除失败,请重试\n\n" + data.error_info);
            }
            getList();
        });
    }
}

function getStatu(target) {
    var statu;
    switch (target) {
        case '1':
        {
            statu = "待确认";
            break;
        }
        case '2':
        {
            statu = "已确认";
            break;
        }
        case '3':
        {
            statu = "已看房";
            break;
        }
        case '4':
        {
            statu = "已过期";
            break;
        }
        case '5':
        {
            statu = "已取消";
            break;
        }
        case "待确认":
        {
            statu = "1";
            break;
        }
        case "已确认":
        {
            statu = "2";
            break;
        }
        case "已看房":
        {
            statu = "3";
            break;
        }
        case "已过期":
        {
            statu = "4";
            break;
        }
        case "已取消":
        {
            statu = "5";
            break;
        }
    }
    return statu;
}
function nextStatus(target) {
    var statu;
    switch (target) {
        case '1':
        {
            statu = "确认";
            break;
        }
        case '2':
        {
            statu = "看房";
            break;
        }
        case '3':
        {
            statu = null;
            break;
        }
        case '4':
        {
            statu = null;
            break;
        }
        case '5':
        {
            statu = "null";
            break;
        }
        case "待确认":
        {
            statu = "已确认";
            break;
        }
        case "已确认":
        {
            statu = "已看房";
            break;
        }
        case "已看房":
        {
            statu = null;
            break;
        }
        case "已过期":
        {
            statu = null;
            break;
        }
        case "已取消":
        {
            statu = null;
            break;
        }
    }
    return statu;
}
