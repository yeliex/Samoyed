function resetUnitsListUI() {
    var unitsList = $(".units-list .row");
    var unitsNum = unitsList.length;
    for (var i = 0; i < unitsNum; i++) {
        if (i % 2 != 0) {
            // 双数行
            var item = unitsList[i];
            item.setAttribute('class', 'row second');
        }
    }
}

var pos = new Array(0, 0);
var building;
var map;

function initMap(posx, posy, building_info) {
    pos[0] = posx;
    pos[1] = posy;
    building = building_info;
    // 初始化经纬度
    var position = new AMap.LngLat(posx, posy);
    // 加载地图
    map = new AMap.Map('map-content', {
        //resizeEnable: true,
        //rotateEnable: true,
        dragEnable: true,
        zoomEnable: false,
        //设置可缩放的级别
        //zooms: [3,18],
        //传入2D视图，设置中心点和缩放级别
        view: new AMap.View2D({
            center: position,
            zoom: 12
        })
    });
    // 加载标注点
    var mapMarker = new AMap.Marker({
        map: map,
        position: position,
        icon: "http://webapi.amap.com/images/0.png"
    });
    // 添加信息
    var item_info = [];
    item_info.push("<b>" + building_info.name + "</b>");
    item_info.push(building_info.area + "-" + building_info.add);

    var inforWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -23),
        content: item_info.join("<br>")
    });

    inforWindow.open(map, mapMarker.getPosition());

    AMap.event.addListener(mapMarker, "click", function (e) {
        inforWindow.open(map, mapMarker.getPosition());
    });
}

function initPanorama(posx, posy) {
    // 初始化坐标
    var position = new qq.maps.LatLng(posy, posx);
    // 加载街景
    // 高德街景
    //var apos = new AMap.LngLat(posx, posy);//创建中心点坐标
    //var opts = {pov: {heading: 270, pitch: 0}, position: position};
    //var panorama = new AMap.Panorama('map-content', opts);

    // 腾讯街景
    // 首先获取最近的一个街景ID
    var panoService = new qq.maps.PanoramaService();
    panoService.getPano(position, 1000, function (result) {
        if (result) {
            var panoID = result.svid;
            // 开始初始化街景
            $("#map-content").removeAttr("class");
            $("#map-content").removeAttr("style");
            $("#map-content").html("");
            var panorama = new qq.maps.Panorama(document.getElementById("map-content"));
            panorama.setPano(panoID);
            qq.maps.event.addDomListener(panorama, 'loaded', function () {
                setTimeout(function () {
                    $("#map-content").children().children()[2].style.display = 'none';
                }, 1);
            });
        }
        else {
            $("#panorama-btn").addClass('disabled');
            $("#panorama-btn .visible.content").text("暂无街景");
            console.log(result, position, pos);
            onPanprama = false;
            return false;
        }
    });
}
var onPanprama = false;

$(function () {
    $("#panorama-btn").click(function () {
        var posx = pos[0];
        var posy = pos[1];
        var text = $("#panorama-btn .visible.content").text();
        if (onPanprama && text === "地图") {
            // Changes to Map
            initMap(posx, posy, building);
            onPanprama = false;
            $("#panorama-btn .visible.content").text("街景");
        }
        else {
            onPanprama = true;
            initPanorama(posx, posy);
            $("#panorama-btn .visible.content").text("地图");
        }
    });
    $("#refresh-btn").click(function () {
        var posx = pos[0];
        var posy = pos[1];
        if (onPanprama) {
            initPanorama(posx, posy);
        }
        else {
            initMap(posx, posy, building);
        }
    });
    $("#zoom-btn").checkbox({
        onChecked: function () {
            // 允许地图缩放
            map.setStatus({zoomEnable: true});
            $("#zoom-btn span").text("开");
        },
        onUnchecked: function () {
            // 禁止地图缩放
            map.setStatus({zoomEnable: false});
            $("#zoom-btn span").text("关");
        }
    });
});
/**
 *
 * @param string posx 经度
 * @param string posy 纬度
 * @constructor
 */
function MapPos(posx, posy) {
    this.apos = new AMap.LngLat(posx, posy);
    this.bpos = new BMap.Point(posx, posy);
}

// 图片放大
function bindImgClicked() {
    $("img").bind("click", function () {
        var src = $(this).attr("src");
        var target = $(this);
        var modal = $("#image-modal");
        if (target.hasClass("modal")) {
            return;
        }
        if (target.hasClass('image')) {
            // 其他图片
            $("#image-modal span").text($(target[0].parentNode).text());
        }
        else {
            // 户型图片
            $("#image-modal span").text($(this).parentsUntil(".row").last().children().first().text());
        }
        $("#image-modal img").attr("src", src);
        modal.css("max-height", window.outerHeight * 0.8);
        modal.modal("show");
    });
}
