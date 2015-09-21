// 开始初始化显示数据
$(function () {
    // 构建新数据对象
    var data = new BuildingData();
    // 构建设置对象
    var set = new SetDetail();
    // 开始设置数据
    set.setTitle(data.name, data.dadd); // 设置标题
    set.setName(data.name); // 设置建筑名字
    set.setPrice(data.price); // 设置价格范围
    set.setAdd(data.dadd); // 设置地址
    set.setSize(data.size); // 设置面积范围
    set.setBackground(data.pic); // 设置详情页大图
    set.setDescription(data.desc); // 设置详细描述
    set.setUnits(data.units.length, data.units); // 设置户型
    set.setMap(data); // 设置地图
    set.setImages(data.images.length, data.images); // 设置图片列表
    bindImgClicked();
});

function BuildingData() {
    var data = initData();
    this.id = data.bid; // 获取建筑ID
    this.data = data.bData; // 获取建筑数据
    this.name = data.bData.dog_name; // 获取建筑名字
    this.district = getDistrict(data.bData.dog_district); // 根据区邮编得出所在区
    this.area = data.bData.dog_area; // 获取建筑商圈
    this.add = data.bData.dog_add; // 获取建筑地址
    this.dadd = this.district + "-" + this.area + "-" + this.add; // 生成用于显示的描述性地址
    this.pos = data.bData.dog_pos.split("|"); // 获取坐标(经纬度);
    this.size = data.bData.dog_size.split("|").join("-"); // 获取建筑面积范围
    this.price = data.bData.dog_price.split("|").join("-"); // 获取建筑价格范围
    this.pic = data.bData.dog_pic; // 获取详情页大图
    this.desc = data.bData.dog_desc; // 获取建筑详细描述

    this.images_num = data.bData.pic_num; // 获取详细图片数量
    this.images = getImages(this.id); // 获取详细图片数据

    this.units_num = data.bData.units_num; // 获取户型数量
    this.units = getUnits(this.id); // 获取户型数据
}
function UnitData(data) {
    this.name = data.unit_name;
    this.id = data.unit_id;
    this.price = data.unit_price;
    this.size = data.unit_size;
    this.pic = data.unit_pic;
    this.deco = data.unit_deco;
}
function ImageData(data) {
    this.name = data.image_name;
    this.url = data.image_url;
}

// 初始化数据
function initData() {
    var bid = getBID();
    return {
        bid: bid,
        bData: getData(bid)
    };
}
// 获取建筑ID
function getBID() {
    var pageUrl = parseURL(location.href);
    var args = pageUrl.params;
    var bid = args['id'];
    return bid;
}
// Ajax获取建筑数据
function getData(bid) {
    var dataTemp = {};

    var req = $.ajax("http://api.dev.mzapp.info/item", {
        method: "GET",
        async: false,
        data: {
            protocol: 'json',
            id: bid
        }
    });
    req.complete(function (returnData) {
        var data = returnData.responseText;
        dataTemp = $.parseJSON(data);
        if (dataTemp.status !== "success") {
            alert("获取数据失败: " + dataTemp.error_info);
            window.location.href = location.origin + "/list";
            return;
        }
    });
    return dataTemp.overview;
}
function getUnits(bid) {
    var dataTemp = {};
    var req = $.ajax("http://api.dev.mzapp.info/item/units", {
        method: "GET",
        async: false,
        data: {
            protocol: 'json',
            id: bid
        }
    });
    req.complete(function (returnData) {
        var data = returnData.responseText;
        dataTemp = $.parseJSON(data);
    });
    return dataTemp.overview;
}
function getImages(bid) {
    var dataTemp = {};

    var req = $.ajax("http://api.dev.mzapp.info/item/images", {
        method: "GET",
        async: false,
        data: {
            protocol: 'json',
            id: bid
        }
    });
    req.complete(function (returnData) {
        var data = returnData.responseText;
        dataTemp = $.parseJSON(data);
    });
    return dataTemp.overview;
}

// 获取建筑所在区
function getDistrict(code, type) {
    var district;
    if (type === 1) {
        // 区名转换为代码
        switch (code) {
            case "上城区":
            {
                district = "310002";
                break;
            }
            case "下城区":
            {
                district = "310006";
                break;
            }
            case "江干区":
            {
                district = "310016";
                break;
            }
            case "310011":
            {
                district = "拱墅区";
                break;
            }
            case "西湖区":
            {
                district = "310013";
                break;
            }
            case "滨江区":
            {
                district = "310051";
                break;
            }
            case "萧山区":
            {
                district = "311201";
                break;
            }
            case "余杭区":
            {
                district = "311100";
                break;
            }
            default :
            {
                district = "0";
                break;
            }
        }
    }
    else {
        switch (code) {
            case "310002":
            {
                district = "上城区";
                break;
            }
            case "310006":
            {
                district = "下城区";
                break;
            }
            case "310016":
            {
                district = "江干区";
                break;
            }
            case "310011":
            {
                district = "拱墅区";
                break;
            }
            case "310013":
            {
                district = "西湖区";
                break;
            }
            case "310051":
            {
                district = "滨江区";
                break;
            }
            case "311201":
            {
                district = "萧山区";
                break;
            }
            case "311100":
            {
                district = "余杭区";
                break;
            }
            default :
            {
                district = "杭州市";
                break;
            }
        }
    }
    return district;
}

// 设置页面数据
function SetDetail() {
    // 设置页面标题
    this.setTitle = function (name, add) {
        $("title").text(name + " | " + add + " | " + $("title").text());
    };
    // 设置建筑名字
    this.setName = function (name) {
        $(".ye-detail .segament .intro-wrapper .intro.title h1 span.bname").text(name); // 设置详情页建筑名字
        $(".ye-detail .appointment .form#building_name span").text(name);
    };
    // 设置价格范围
    this.setPrice = function (price) {
        $(".ye-detail .segament .intro-wrapper .intro.info h1 span").text(price);
    };
    // 设置显示的描述性地址
    this.setAdd = function (add) {
        $(".ye-detail .segament .intro-wrapper .intro.title h2").text(add);
    };
    // 设置面积范围
    this.setSize = function (size) {
        $(".ye-detail .segament .intro-wrapper .intro.info h2 span").text(size);
    };
    // 设置大图
    this.setBackground = function (url) {
        $(".ye-detail .segament").css('background-image', "url(" + url + ")");
        $(".ye-detail .appointment .appointment-preview").css('background-image', "url(" + url + ")");
    };
    // 设置详细描述
    this.setDescription = function (string) {
        $(".ye-detail .detail-desc .desc-content").html(string);
    };
    // 设置地图
    this.setMap = function (building) {
        initMap(building.pos[0], building.pos[1], building);
    };
    // 设置户型显示
    this.setUnits = function (num, data) {
        // 设置户型数
        $(".ye-detail .detail-units .detail-title h2 span").text(num);
        for (var i = 0; i <= num - 1; i++) {
            var itemData = data[i];
            var item = new UnitData(itemData);
            var unitStr = "<li class='row'><ul>";
            unitStr += "<li><span>" + item.name + "</span></li>";
            unitStr += "<li><span>" + item.size + "</span> 平方米</li>";
            unitStr += "<li><span>" + item.price + "</span> 元/天/平方米</li>";
            unitStr += "<li>" + item.deco + "</li>";
            unitStr += "<li><span><img src='" + item.pic + "'></span></li>";
            unitStr += "</ul></li>";
            $(".ye-detail .detail-units .units-list .col").append(unitStr);
        }
        resetUnitsListUI(); // 设置户型显示背景色
    };
    // 设置图片列表
    this.setImages = function (num, data) {
        if (num == 0) {
            var imageStr = "<div class='no-img'>";
            imageStr += "<div class='no-img-content'>";
            imageStr += "<p>暂无图片</p>";
            imageStr += "</div></div>";
            $($(".ye-detail .detail-img .img-list").parent()).html(imageStr);
        }
        else {
            for (var i = 0; i <= num - 1; i++) {
                var itemData = data[i];
                var item = new ImageData(itemData);
                var imageStr = "<div class='ui segment'>";
                imageStr += "<div class='ui bottom attached label'>" + item.name + "</div>";
                imageStr += "<img class='ui image' src='" + item.url + "'>";
                imageStr += "</div>";
                $(".ye-detail .detail-img .img-list .images").append(imageStr);
            }
        }
    }
}