$(function () {
    $("#select-district .ui.dropdown").dropdown();
    districtSelect(0);
});

function districtSelect(code) {
    clearEdit();
    var data = getList(code); //获取列表数据
    var num = data.num;
    $(".table#list tbody").html("");
    for (var i = 0; i < num; i++) {
        displayList(data.data[i]); // 显示
    }
    $("#bill_manager #list_num span").text(num);
}
function getList(code) {
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/billlist/", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            district: code
        }
    });
    req.complete(function (returnData) {

        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
    });
    return data.data;
}
function displayList(data) {
    data = new BuildingData(data);
    var str = "<tr id='" + data.id + "'>";
    str += "<td>" + data.id + "</td><td>" + data.name + "</td><td>" + data.dadd + "</td>";
    str += "<td>" + data.price + "</td><td>" + data.size + "</td><td>" + data.units_num + "</td><td>" + data.images_num + "</td>";
    str += "<td><div class='ui teal small buttons preview'><div class='ui button primary'>查看</div>";
    str += "<div class='ui floating dropdown icon button'>";
    str += "<i class='dropdown icon'></i><div class='menu'>";
    str += "<div class='item detail' data-value='preview-detail'>详情页</div><div class='ui divider'></div><div class='item main-image' data-value='preview-main-image'>主图</div><div class='item units' data-value='preview-units'>户型</div><div class='item images' data-value='preview-images'>其他图片</div>";
    str += "</div></div></div></td>";
    str += "<td><div class='ui red small buttons edit'><div class='ui button primary'>修改</div>";
    str += "<div class='ui floating dropdown icon button'>";
    str += "<i class='dropdown icon'></i><div class='menu'>";
    str += "<div class='item basic' data-value='edit-basic'>编辑房源</div><div class='item units' data-value='edit-units'>编辑户型</div><div class='item images' data-value='edit-images'>编辑图片</div><div class='divider'></div><div class='item remove' data-value='edit-remove'>删除</div>";
    str += "</div></div></div></td></tr>";
    $(".table#list tbody").append(str);
    activeDrop(data.id);
}

function BuildingData(data) {
    this.id = data.dog_id;
    this.name = data.dog_name;
    this.district = data.dog_district;
    this.area = data.dog_area;
    this.add = data.dog_add;
    this.dadd = data.dog_district + "-" + data.dog_area + "-" + data.dog_add;
    this.size = data.dog_size.split("|").join("-");
    this.price = data.dog_price.split("|").join("-");
    this.image = data.dog_pic;
    this.units_num = data.units_num;
    this.images_num = data.images_num;
    this.metro = data.dog_metro.split("|");
    this.pos = data.dog_pos.split("|");
    this.description = data.dog_description;
}
function UnitData(data) {
    this.id = data.unit_id;
    this.name = data.unit_name;
    this.size = data.unit_size;
    this.price = data.unit_price;
    this.image = data.unit_pic;
    this.decoration = data.unit_deco;
}
function ImageData(data) {
    this.id = data.image_id;
    this.name = data.image_name;
    this.url = data.image_url;
    this.avaliable = data.image_avaliable;
}
function NewBasicData() {
    this.id = $(".edit.edit-basic .header span").text();
    this.name = $(".edit.edit-basic .form #basic input").val();
    this.extract = {
        metro: {
            "line_1": $($("#metro .checkbox")[0]).checkbox('is checked'),
            "line_2": $($("#metro .checkbox")[1]).checkbox('is checked'),
            "line_4": $($("#metro .checkbox")[2]).checkbox('is checked'),
            "line_5": $($("#metro .checkbox")[3]).checkbox('is checked'),
            "line_6": $($("#metro .checkbox")[4]).checkbox('is checked')
        }, // 地铁数据
        description: $("#description textarea").val() // 描述信息
    };
    this.address = {
        district: $("#district").val(),
        area: $("#area").val(),
        address: $("#add").val(),
        pos: {
            posx: $("#posx").val(),
            posy: $("#posy").val()
        }
    };
}

function activeDrop(id) {
    $("#" + id + " .preview .ui.dropdown").dropdown({
        onChange: function (value) {
            switch (value) {
                case 'preview-detail':
                {
                    previewDetail(id);
                    break;
                }
                case 'preview-main-image':
                {
                    previewImage(id);
                    break;
                }
                case 'preview-units':
                {
                    previewUnits(id);
                    break;
                }
                case 'preview-images':
                {
                    previewImages(id);
                    break;
                }
            }
        }
    });
    $("#" + id + " .edit .ui.dropdown").dropdown({
        onChange: function (value) {
            switch (value) {
                case 'edit-basic':
                {
                    editBasic(id);
                    break;
                }
                case 'edit-main-image':
                {
                    editMainImage(id);
                    break;
                }
                case 'edit-units':
                {
                    editUnits(id);
                    break;
                }
                case 'edit-images':
                {
                    editImages(id);
                    break;
                }
                case 'edit-remove':
                {
                    editRemove(id);
                    break;
                }
            }
        }
    });
}

function previewDetail(id) {
    // 查看详情页
    var url = "http://mizhi.pub/detail?id=" + id;
    window.open(url);
}

function previewImage(id) {
    // 查看图片
    // 直接Ajax请求图片 服务器再根据ID位数判断显示哪个 9位为大图 12位为户型图
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getImage", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
        else {
            data = data.data;
        }
    });
    var url = data.url;
    $(".ui.modal.preview.main-image .header span").text(id);
    if (String(id).length == 12) {
        $(".ui.modal.preview.main-image .header span").append(" 户型图片");
    }
    else {
        $(".ui.modal.preview.main-image .header span").append(" 房源主图");
    }
    $(".ui.modal.preview.main-image img").attr('src', url);
    $(".ui.modal.preview.main-image").modal('show');
}

function previewUnits(id) {
    // 查看户型列表
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getUnits", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
        else {
            data = data.data; // 最后返回data为户型数据数组
        }
    });
    $(".ui.modal.preview.units .content table tbody").html(""); // 需要先清空
    for (var i = 0; i < data.length; i++) {
        var unit = new UnitData(data[i]);
        var str = "<tr id='" + unit.id + "'>";
        str += "<td>" + unit.id + "</td><td>" + unit.name + "</td><td>" + unit.size + "</td><td>" + unit.price + "</td><td>" + unit.decoration + "</td>";
        str += "<td><div class='ui small button teal' onclick='previewImage(" + unit.id + ")'>查看</div></td>";
        str += "</tr>";
        $(".ui.modal.preview.units .content table tbody").append(str);
    }
    $(".ui.modal.preview.units .content table thead tr th span").text(data.length);
    $(".ui.modal.preview.units header span").text(id);
    //$(".ui.modal.preview").modal({allowMultiple: true});
    $(".ui.modal.preview.units").modal('show');
}

function previewImages(id) {
    // 查看图片列表
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getImages", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
        else {
            data = data.data; // 最后返回data为户型数据数组
        }
    });
    $(".ui.modal.preview.images .content .images").html("");
    for (var i = 0; i < data.length; i++) {
        var image = new ImageData(data[i]);

        var str = "<div class='ui segment'>";
        str += "<div class='ui bottom attached label'>" + image.name + "</div>";
        str += "<img class='ui image' src='" + image.url + "' id='" + image.id + "'>";
        str += "</div>";

        $(".ui.modal.preview.images .content .images").append(str);
    }
    $(".ui.modal.preview.images .header span").text(id + "  图片数: " + data.length);
    $(".ui.modal.preview.images").modal('show');
}

function editBasic(id) {

    clearEdit();
    // 编辑房源基本信息
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getBasic", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
            return;
        }
        else {
            data = data.data; // 最后返回data为信息数据

            data = new BuildingData(data);

            $(".ui.modal.edit.edit-basic .header span").text(data.id);
            $(".ui.modal.edit.edit-basic #basic input").val(data.name);
            //$(".ui.modal.edit.edit-basic .checkbox").checkbox();
            (data.metro[0] == 'true') ? $($("#metro .checkbox")[0]).checkbox('set checked') : $($("#metro .checkbox")[0]).checkbox();
            (data.metro[1] == 'true') ? $($("#metro .checkbox")[1]).checkbox('set checked') : $($("#metro .checkbox")[0]).checkbox();
            (data.metro[2] == 'true') ? $($("#metro .checkbox")[2]).checkbox('set checked') : $($("#metro .checkbox")[0]).checkbox();
            (data.metro[3] == 'true') ? $($("#metro .checkbox")[3]).checkbox('set checked') : $($("#metro .checkbox")[0]).checkbox();
            (data.metro[4] == 'true') ? $($("#metro .checkbox")[4]).checkbox('set checked') : $($("#metro .checkbox")[0]).checkbox();

            // 设置地图 还需要添加一个标记点
            onMapLoaded(false, data.pos);

            // 加载标注点
            var mapMarker = new AMap.Marker({
                map: map,
                position: new AMap.LngLat(data.pos[0], data.pos[1]),
                icon: "http://webapi.amap.com/images/0.png"
            });
            // 添加信息
            var item_info = [];
            item_info.push("<b>" + data.name + "</b>");
            item_info.push(data.dadd);
            var inforWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -23),
                content: item_info.join("<br>")
            });
            inforWindow.open(map, mapMarker.getPosition());
            AMap.event.addListener(mapMarker, "click", function (e) {
                inforWindow.open(map, mapMarker.getPosition());
            });

            // 设置地址
            $(".ui.modal.edit.edit-basic #district").val(data.district).dropdown();
            $(".ui.modal.edit.edit-basic #area").val(data.area).dropdown();
            $(".ui.modal.edit.edit-basic #add").val(data.add);
            $(".ui.modal.edit.edit-basic #posx").val(data.pos[0]);
            $(".ui.modal.edit.edit-basic #posy").val(data.pos[1]);
            $(".ui.modal.edit.edit-basic #description textarea").val(data.description);

            $(".ui.modal.edit.edit-basic").modal('setting', 'closable', false).modal('show').modal({
                onDeny: function () {
                    $(".ui.modal.edit.edit-basic").modal('hide');
                },
                onApprove: function () {
                    // 开始保存
                    var newData = new NewBasicData();
                    if (onBasicCheck(newData)) {
                        // 校验通过,发送数据
                        var req = $.ajax("http://api.panel.mzapp.info/billmanager/basicsave/?protocol=json", {
                            method: "POST",
                            async: false,
                            data: {
                                data: newData
                            }
                        });
                        req.complete(function (returnData) {
                            returnData = $.parseJSON(returnData.responseText);
                            if (returnData.status === "success") {
                                $(".ui.modal.edit.edit-basic").modal('hide');
                                alert("保存成功 现在你可以在 '房源管理' 中管理房源\n\n房源ID: " + returnData.data.id + "\n房源名字: " + returnData.data.name);
                                // 开始重新加载
                                var district = $("#district-select").dropdown('get value');
                                districtSelect(district[0]);
                            }
                            else {
                                alert("保存失败\n\n错误: " + returnData.error_info);
                            }
                        })
                    }
                }
            });
        }
    });
}

function editUnits(id) {

    clearEdit();
    // 编辑户型信息
    // 首先获取户型数据
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getUnits", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
        }
        else {
            data = data.data; // 最后返回data为信息数据

            var num = data.length;
            $(".edit.units .content-wrapper").html("");
            //var ii = 0;
            for (var i = 0; i < data.length; i++) {
                //ii++;
                var unit = new UnitData(data[i]);
                var currentUnitNum = i + 1;
                var defaultUnitName = "户型" + currentUnitNum;
                var str = "<fieldset id='" + unit.id + "'><legend>" + defaultUnitName + "</legend>";
                str += "<div class='ui grid'><div class='ten wide column'>";
                str += "<div class='fields'><div class='five wide field'>";
                str += "<label>户型名称</label><input type='text' value='" + unit.name + "' placeholder='" + defaultUnitName + "' readonly>";
                str += "</div>";
                str += "<div class='five wide field'>";
                str += "<label>面积 / 平方米</label><input type='text' placeholder='户型面积' value='" + unit.size + "' readonly>";
                str += "</div></div>";
                str += "<div class='fields'>";
                str += "<div class='five wide field'>";
                str += "<label>价格 / 元/天/平方米</label><input type='text' placeholder='户型价格' value='" + unit.price + "' readonly>";
                str += "</div>";
                str += "<div class='five wide field'>";
                str += "<label>装修类型</label>";
                str += "<input value='" + unit.decoration + "' readonly></input>";
                str += "</div></div></div>";
                str += "<div class='two wide column'><button class='ui red button' onclick='onUnitDelete(" + unit.id + "," + id + ")'>删除</button></div>";
                str += "<div class='four wide column'><div class='field'>";
                str += "<img class='ui image' src='" + unit.image + "'>";
                str += "</div></div></div></fieldset>";
                $(".edit.units .content-wrapper").append(str);
            }

            $(".edit.units #units_num span").text(num);
            $(".edit.units .header span").text(id);
            $(".edit.units").show();
            $(".ui.button.add.unit").on('click', function (event) {
                event.preventDefault();
                onEditNewUnitClicked();
            });
        }
    });
}

function editImages(id) {

    clearEdit();
    // 编辑图片列表
    // 首先获取其他图片数据
    var data;
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/getImages", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        if (data.status != "success") {
            alert("获取失败,请重试\n\n" + data.error_info);
        }
        else {
            data = data.data; // 最后返回data为信息数据
            var num = data.length;

            for (i = 0; i < num; i++) {
                var image = new ImageData(data[i]);
                var currentImageNum = i + 1;
                var defaultUnitName = "图片" + currentImageNum;

                var html = $(".edit.images .content-wrapper").html(); // 获取已存在的html
                var str = "<div class='field' id='" + image.id + "'>";
                str += "<div class='ui action input'>";
                str += "<input type='text' placeholder='图片名称' value='" + image.name + "' readonly>";
                str += "<button class='ui red button' onclick='onImageDelete(" + image.id + "," + id + ")'>删除</button>";
                str += "</div>";
                str += "<img class='ui medium image' src='" + image.url + "'>";
                str += "</div>";

                if ((currentImageNum - 1) % 4 === 0) {
                    // 在每组的开头
                    str = "<div class='fields'>" + str;
                }
                else if (currentImageNum % 4 === 0) {
                    // 在每组结尾
                    html = html.substr(0, html.length - 6);
                    str += "</div>";
                }
                else {
                    // 在每组中间
                    // 需要删除最后一个</div>
                    html = html.substr(0, html.length - 6);
                }
                str += "</div>";
                str = html + str;
                $(".edit.images .content-wrapper").html(str);
            }

            $(".edit.images #images_num span").text(num);
            $(".edit.images .header span").text(id);
            $(".edit.images").show();
            $(".ui.button.add.images").on('click', function (event) {
                event.preventDefault();
                onEditNewImageClicked();
            });
        }
    });

    // 设置主图
    var main_image;
    var main_req = $.ajax("http://api.panel.mzapp.info/billmanager/getMainImage", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            id: id
        }
    });
    main_req.complete(function (returnData) {
        main_image = $.parseJSON(returnData.responseText).data;
        $(".edit.images #main-image img").attr("src", main_image.url);
        $(".edit.images #main-image input").val(main_image.url);
    });
}

function editRemove(id) {
    clearEdit();
    // 删除房源
    // Ajax删除后不需要重新加载页面 直接将表格行标红 后面操作按钮变为已删除 文字也变成删除样式
    if (confirm("是否要删除户型: " + id)) {
        var req = $.ajax("http://api.panel.mzapp.info/billmanager/deleteBuilding/", {
            method: "GET",
            async: false,
            data: {
                protocol: "json",
                id: Number(id)
            }
        });
        req.complete(function (returnData) {
            returnData = $.parseJSON(returnData.responseText);
            if (returnData.status === "success") {
                alert("删除成功");
                // 开始重新加载
                var district = $("#district-select").dropdown('get value');
                districtSelect(district[0]);
            }
            else {
                alert("删除失败\n\n错误: " + returnData.error_info);
            }
        })
    }
}


function onBasicCheck(data) {
    if (data.name === "") {
        alert("请输入名称");
        return false;
    }
    //else if() {} // 判断是否已生成ID
    else if (data.address.district === "" || data.address.area === "" || data.address.address === "" || data.address.pos.posx === "" || data.address.pos.posy === "") {
        alert("请将地址分类下所有内容填写完整");
        return false;
    }
    else {
        return true;
    }
}

function onUnitDelete(id, bid) {
    // 删除户型
    if (confirm("是否要删除户型: " + id)) {
        // 确认删除
        // 直接Ajax删除后重新加载
        var data;
        var req = $.ajax("http://api.panel.mzapp.info/billmanager/deleteUnit", {
            method: "GET",
            async: false,
            data: {
                protocol: "json",
                id: id
            }
        });
        req.complete(function (returnData) {
            data = $.parseJSON(returnData.responseText);
            if (data.status != "success") {
                alert("获取失败,请重试\n\n" + data.error_info);
                return;
            }
        });
        var district = $("#district-select").dropdown('get value');
        districtSelect(district[0]);
        editUnits(bid); // 重新加载
    }
}

function onImageDelete(id, bid) {
    // 删除户型
    if (confirm("是否要删除图片: " + id)) {
        // 确认删除
        // 直接Ajax删除后重新加载
        var data;
        var req = $.ajax("http://api.panel.mzapp.info/billmanager/deleteImage", {
            method: "GET",
            async: false,
            data: {
                protocol: "json",
                id: id
            }
        });
        req.complete(function (returnData) {
            data = $.parseJSON(returnData.responseText);
            if (data.status != "success") {
                alert("获取失败,请重试\n\n" + data.error_info);
                return;
            }
        });
        var district = $("#district-select").dropdown('get value');
        districtSelect(district[0]);
        editImages(bid); // 重新加载
    }
}

function onEditNewUnitClicked() {
    //var str = $(".edit.units .content-wrapper").html();
    //$(".edit.units .content-wrapper").html("");
    var currentUnitNum = Number($(".edit.units #units_num span").text()) + 1;
    var defaultUnitName = "户型" + currentUnitNum;
    var str = "<fieldset id='unit_" + currentUnitNum + "'><legend>" + defaultUnitName + "</legend>";
    str += "<div class='ui grid'><div class='ten wide column'>";
    str += "<div class='fields'><div class='five wide field'>";
    str += "<label>户型名称</label><input type='text' value='" + defaultUnitName + "' placeholder='" + defaultUnitName + "'>";
    str += "</div>";
    str += "<div class='five wide field'>";
    str += "<label>面积 / 平方米</label><input type='text' placeholder='户型面积'>";
    str += "</div></div>";
    str += "<div class='fields'>";
    str += "<div class='five wide field'>";
    str += "<label>价格 / 元/天/平方米</label><input type='text' placeholder='户型价格'>";
    str += "</div>";
    str += "<div class='five wide field'>";
    str += "<label>装修类型</label>";
    str += "<select class='ui dropdown'>";
    str += "<option value=''>选择装修类型</option>";
    str += "<option value='精装'>精装</option>";
    str += "<option value='简装'>简装</option>";
    str += "<option value='工装'>工装</option>";
    str += "<option value='未装修'>未装修</option>";
    str += "</select></div></div></div>";
    str += "<div class='two wide column'><div class='field'><button class='ui button' onclick='onUpload(5," + currentUnitNum + ")'>图片</button></div><div class='field'><button class='ui green button' onclick='onEditUnitSave(" + currentUnitNum + ")'>保存</button></div></div>";
    str += "<div class='four wide column'><div class='field'>";
    str += "<img class='ui image' src='http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png'>";
    str += "</div></div></div></fieldset>";

    $(".edit.units .content-wrapper").append($(str));
    $("#unit_" + currentUnitNum + " .ui.dropdown").dropdown();
    $(".edit.units #units_num span").text(currentUnitNum);
}
function onEditUnitSave(num) {
    var bid = $(".edit.units .header span").text();
    // 获取户型数据
    var data = new GetUnitData(num, bid);
    // 验证户型数据
    if (data.id === undefined) {
        alert("户型ID获取失败,请重试");
        return;
    }
    if (data.decoration === undefined) {
        alert("请选择装修类型");
        return;
    }

    // Ajax上传户型数据
    var req = $.ajax("http://api.panel.mzapp.info/billmanager/unitsave/?protocol=json", {
        method: "POST",
        async: false,
        data: {
            data: data
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        if (returnData.status === "success") {
            alert("保存成功 现在你可以在 '户型管理' 中看到新户型\n\n户型ID: " + returnData.data.id + "\n户型名字: " + returnData.data.name);
            // 开始重新加载
            var district = $("#district-select").dropdown('get value');
            districtSelect(district[0]);
            editUnits(bid);
        }
        else {
            alert("保存失败\n\n错误: " + returnData.error_info);
        }
    })
}

function GetUnitData(num, bid) {
    this.id = getUnitID(bid);
    this.bid = bid;
    this.name = $($('#unit_' + num).children()[1].children[0].children[0].children[0]).children('input').val();
    this.size = $($('#unit_' + num).children()[1].children[0].children[0].children[1]).children('input').val();
    this.price = $($('#unit_' + num).children()[1].children[0].children[1].children[0]).children('input').val();
    this.decoration = $('#unit_' + num).find('.item.active.selected').attr('data-value');
    this.image = $('#unit_' + num).find('img').attr('src');
}

function getUnitID(bid) {
    var uid;
    var req = $.ajax('http://api.panel.mzapp.info/billmanager/unitid/', {
        method: "GET",
        async: false,
        data: {
            protocol: 'json',
            bid: bid
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        if (returnData.status == 'failed') {
            alert("获取户型ID失败");
        }
        else {
            uid = returnData.data.id;
        }
    });
    return uid;
}

function onEditNewImageClicked() {
    // 添加新图片
    var currentImageNum = Number($(".edit.images #images_num span").text()) + 1;
    var defaultImageNum = "图片" + currentImageNum;

    var html = $(".edit.images .content-wrapper").html();
    var str = "<div class='field' id='image_" + currentImageNum + "'>";
    str += "<div class='ui action input'>";
    //str += "<div class='image-link' hidden>http://img.static.mzapp.info/default_unit.png</div>";
    str += "<input type='text' placeholder='图片名称' value='" + defaultImageNum + "'>";
    str += "<button class='ui teal right labeled icon button' onclick='onUpload(6," + currentImageNum + ")'><i class='upload icon'></i> 上传</button>";
    str += "</div>";
    str += "<img class='ui medium image' src='http://img.static.mzapp.info/default_unit.png'>";
    str += "</div>";

    if ((currentImageNum - 1) % 4 === 0) {
        // 在每组的开头
        str = "<div class='fields'>" + str;
    }
    else if (currentImageNum % 4 === 0) {
        // 在每组结尾
        html = html.substr(0, html.length - 6);
        str += "</div>";
    }
    else {
        // 在每组中间
        // 需要删除最后一个</div>
        html = html.substr(0, html.length - 6);
    }
    str += "</div>";
    str = html + str;

    $(".edit.images #images_num span").text(currentImageNum);
    $(".edit.images .content-wrapper").html(str);
}

function clearEdit() {
    $(".edit.units .content-wrapper").html("");
    $(".edit.units .header span").text("");
    $(".edit.images .header span").text("");
    $(".edit.images .content-wrapper").html("");
    $(".edit.units").hide();
    $(".edit.images").hide();
}

function onEditMainImageSave(url) {
    var id = $($(".edit.images h5.header span")[0]).text();
    // 保存图片
    var req = $.ajax('http://api.panel.mzapp.info/billmanager/newMainImage/?protocol=json', {
        method: "POST",
        async: false,
        data: {
            id: id,
            url: url
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        if (returnData.status !== 'success') {
            alert("保存失败");
        }
        else {
            $(".edit.images #main-image img").attr("src", url);
            $(".edit.images #main-image input").val(url);
            alert("主图更新成功");
        }
    });
}

function onEditNewImageSave(url, serial) {
    var bid = $($(".edit.images h5.header span")[1]).text();
    var iname = $(".edit.images #image_" + serial + " input").val();
    // Ajax保存图片
    var req = $.ajax('http://api.panel.mzapp.info/billmanager/newImageSave/?protocol=json', {
        method: "POST",
        async: false,
        data: {
            id: bid,
            url: url,
            name: iname
        }
    });
    req.complete(function (returnData) {
        returnData = $.parseJSON(returnData.responseText);
        if (returnData.status !== 'success') {
            alert("保存失败");
        }
        else {
            var data = returnData.data;
            // 保存成功,重新加载
            alert("图片更新成功\n\n图片ID: " + data.iid + "\n图片名: " + data.name + "\n房源ID: " + data.bid);
            var district = $("#district-select").dropdown('get value');
            districtSelect(district[0]);
            editImages(data.bid);
        }
    });
}