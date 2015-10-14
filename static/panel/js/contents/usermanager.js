var userConditions = {
    keyword: "",
    target: "",
    primer: "",
    team: false
};
$(function () {
    $("#user_manager .ui.dropdown").dropdown({
        onChange: function () {
            getList();
        }
    });
    $("#user_manager #select-star").checkbox({
        onChange: function () {
            getList();
        }
    });
    getList();
});

function clearConditions() {
    $("#user_manager #user_search input").val("");
    $("#user_manager #search-select").dropdown('set selected', "0");
    $("#user_manager #primer-select").dropdown('set selected', "0");
    $("#user_manager #select-star").checkbox('set unchecked');
    getList();
}
function getList() {
    var data;

    // 将条件写入变量
    userConditions.keyword = $("#user_manager #user_search input").val();
    userConditions.target = $("#user_manager #search-select").dropdown('get value')[0];
    userConditions.primer = $("#user_manager #primer-select").dropdown('get value')[0];
    userConditions.team = $("#user_manager #select-star").checkbox('is checked');

    var req = $.ajax("http://api.panel.mzapp.info/usermanager/userlist/", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            keyword: userConditions.keyword,
            target: userConditions.target,
            primer: userConditions.primer
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
            displayList(data.data)
        }
    });
    userNum(); // 显示用户数
}

function displayList(data) {
    var str = "";
    for (var i = 0; i < data.length; i++) {
        str += userListStr(data[i]);
    }

    $("#user_manager #user_list tbody").html(str);

    for (var i = 0; i < data.length; i++) {
        activeDrop(data[i].user_id);
    }
    $($("#user_manager #list_num span")[0]).text(data.length);
}

function userListStr(data) {
    var user = new UserData(data);
    var str = "<tr id='" + user.id + "'>";
    str += "<td>" + user.id + "</td><td>" + user.phone + "</td><td>" + user.displayName + "</td><td>" + user.email + "</td><td>" + user.team.type + "</td><td>" + user.team.info + "</td><td>" + user.extractPhone + "</td><td>" + user.regDate + "</td>";
    str += "<td><div class='ui red small buttons edit'>";
    str += "<div class='ui button primary'>修改</div>";
    str += "<div class='ui floating dropdown icon button'><i class='dropdown icon'></i>";
    str += "<div class='menu'>";
    str += "<div class='item basic' data-value='edit-basic'>修改信息</div><div class='divider'></div><div class='item remove' data-value='edit-remove'>删除</div>";
    str += "</div></div></div></td>";
    return str;
}

function userNum() {
    $.ajax("http://api.panel.mzapp.info/usermanager/userNum/", {
        method: "GET",
        data: {
            protocol: "json"
        }
    }).complete(function (returnDate) {
        var data = $.parseJSON(returnDate.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
        }
        else {
            $($("#user_manager #list_num span")[1]).text(data.data.total);
            $($("#user_manager #list_num span")[2]).text(data.data.new);
        }
    });
}

function UserData(data) {
    this.id = data.user_id;
    this.name = data.user_name;
    this.title = data.user_title;
    this.displayName = data.user_name + " " + data.user_title;
    this.phone = data.user_phone;
    this.email = data.contacts_email;
    this.extractPhone = data.contacts_phone;
    this.address = data.extract_district + " " + data.extract_address;
    this.team = {
        type: (data.team_type === "yes") ? "团队" : "个人",
        info: (data.team_info === "null") ? " " : ($.parseJSON(data.team_info).size)
    };
    this.regDate = data.reg_date;
}

function activeDrop(id) {
    $("#user_manager #user_list #" + id + " .ui.dropdown").dropdown({
        onChange: function (value) {
            switch (value) {
                case "edit-basic":
                {
                    // 编辑信息
                    editUser(id);
                    break;
                }
                case "edit-remove":
                {
                    // 删除当前用户
                    removeUser(id);
                    break;
                }
            }
        }
    })
}

function removeUser(id) {
    if (confirm("是否要删除用户: " + id + "\n\n此用户名下所有预约将被一并删除并不可恢复")) {
        $.ajax("http://api.panel.mzapp.info/usermanager/removeUser?protocol=json", {
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

function editUser(id) {
    alert("暂未开放");
    getList();
}