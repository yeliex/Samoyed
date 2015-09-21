$(function () {
    currentArgs.district = currentArgs.area;
    if (currentArgs.target === "search") {
        displayList(doSearch(currentArgs))
    } else {
        displayList(doList(currentArgs))
    }
});
function doList(a) {
    var c = {};
    var b = $.ajax("http://api.dev.mzapp.info/plist", {
        method: "GET",
        async: false,
        data: {
            protocol: "json",
            city: "0571",
            district: getDistrict(a.district, 1),
            size: getSize(a.size, 1),
            price: getPrice(a.price, 1)
        }
    });
    b.complete(function (d) {
        c = $.parseJSON(d.responseText)
    });
    return c.overview
}
function doSearch(a) {
}
function displayList(d) {
    var a = d.length;
    for (var b = 0; b < a; b++) {
        var c = d[b];
        displayItem(c)
    }
}
function displayItem(e) {
    var d = new BuildingData(e);
    var f = location.origin + "/detail?id=" + d.id;
    var a = d.name + "-觅知空间-" + d.area + "-" + d.district;
    var g = "<a href='" + f + "' target='_blank'>";
    g += "<div class='card cardLink' id='" + d.id + "'>";
    g += "<div class='ui move left reveal image'>";
    g += "<img src='" + d.image + "' class='visible content'>";
    g += "<div class='hidden content'><div class='unit list'>";
    g += "<table class='ui small celled striped table'>";
    g += "<thead class='full-width'><tr>";
    g += "<th colspan='4'>共有<span>" + d.units.length + "</span>个户型";
    g += "</th></tr></thead>";
    g += "<tbody>";
    for (var b = 0; b < d.units.length && b < 5; b++) {
        var c = new UnitData(d.units[b]);
        g += "<tr><td>" + c.name + "</td><td>" + c.price + "元</td><td>" + c.size + "平</td><td>" + c.deco + "</td></tr>"
    }
    g += "</tbody>";
    g += "<tfoot class='full-width'>";
    g += "<tr><th colspan='4'><div class='right floated'>";
    g += "<a><i class='angle double right icon'></i>更多</a>";
    g += "</div></th></tr></tfoot></table></div></div></div>";
    g += "<div class='content'>";
    g += "<span class='header'>" + d.name + "</span>";
    g += "<div class='meta'>";
    g += "<span class='date'>" + d.dadd + "</span>";
    g += "<a class='right floated'><span>" + d.size + "</span> 平</a>";
    g += "</div></div>";
    g += "<div class='extra content'>";
    g += "<span class='left floated like'>";
    g += "<i class='users icon'></i>2 人关注</span>";
    g += "<a onclick='addFavourite(this)' data-link='" + f + "' data-page='" + a + "'><span class='right floated star'><i class='star icon'></i> 立即收藏 </span></a>";
    g += "</div>";
    g += "<div class='ui bottom teal button'><i class='pointing right icon'> </i> <span>" + d.price + "</span> 元起</div>";
    g += "</div>";
    g += "</a>";
    $(".building.list .cards").append(g)
}
function BuildingData(a) {
    this.id = a.dog_id;
    this.name = a.dog_name;
    this.area = a.dog_area;
    this.district = a.dog_district;
    this.add = a.dog_add;
    this.image = a.dog_pic;
    this.price = a.dog_price.split("|")[0];
    this.size = a.dog_size.split("|").join("-");
    this.units_num = a.units_num;
    this.units = getUnits(this.id);
    this.dadd = this.district + "-" + this.area + "-" + this.add
}
function UnitData(a) {
    this.name = a.unit_name;
    this.id = a.unit_id;
    this.price = a.unit_price;
    this.size = a.unit_size;
    this.pic = a.unit_pic;
    this.deco = a.unit_deco
}
function getUnits(a) {
    var c = {};
    var b = $.ajax("http://api.dev.mzapp.info/item/units", {
        method: "GET",
        async: false,
        data: {protocol: "json", id: a}
    });
    b.complete(function (d) {
        c = $.parseJSON(d.responseText)
    });
    return c.overview
}
function addFavourite(g) {
    var b = $(g).attr("data-link");
    var d = $(g).attr("data-page");
    var c = (navigator.userAgent.toLowerCase()).indexOf("mac") != -1 ? "Command/Cmd" : "CTRL";
    try {
        window.external.AddFavorite(b, d)
    } catch (a) {
        try {
            window.sidebar.addPanel(d, b)
        } catch (f) {
            alert("很抱歉您使用的浏览器不支持此功能\n\n您可以按下 " + c + "+ D 手动添加")
        }
    }
};