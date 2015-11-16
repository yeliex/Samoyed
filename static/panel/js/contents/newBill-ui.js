function onDistrictSelected(value) {
    // 首先生成一个ID
    onNewBillCreate_BillID(value);

    // 然后根据选择的区域生成商圈信息
    var str = "<option value=''>选择商圈</option>";
    switch (value) {
        case "310002": // 上城区
        {
            break;
        }
        case "310006": // 下城区
        {
            break;
        }
        case "310016": // 江干区
        {
            str += "<option value='钱江新城'>钱江新城</option>";
            break;
        }
        case "310011": // 拱墅区
        {
            break;
        }
        case "310013": // 西湖区
        {
            str += "<option value='黄龙商圈'>黄龙商圈</option>";
            break;
        }
        case "310051": // 滨江区
        {
            str += "<option value='滨江商圈'>滨江商圈</option>";
            break;
        }
        case "311201": // 萧山区
        {
            break;
        }
        case "311100": // 余杭区
        {
            break;
        }
        default :
        {
            break;
        }
    }
    $("#area").html(str);
    $("#area").parent().children('.text').text("选择商圈");
}

var map;

function onMapLoaded(target, pos) {
    if (pos == undefined) {
        pos = new Array("120.150492", "30.180617");
    }
    // 首先判断是否已选择区域以及建筑名
    var district = $("#district").parent().children('.text').text();
    var bname = $("#basic input").val();
    var address = district + bname;
    if (!inputChech(district, bname, address, target)) {
        // 地址判断不成功,只显示地图
    }
    else {
        // 地址判断成功,执行搜索
        placeSearch();
    }

    map = new AMap.Map(
        "map-container",
        {
            resizeEnable: true,
            zoomEnable: true, // 允许放大
            center: new AMap.LngLat(pos[0], pos[1]), zoom: 12
        });
    var clickEventListener = AMap.event.addListener(map, "click", function (e) {
        $("#posx").val(e.lnglat.getLng());
        $("#posy").val(e.lnglat.getLat());
    });
    var marker = new Array();
    var windowsArr = new Array();

    function inputChech(a, b, c, clicked) {
        if (clicked) {
            if (a.indexOf("选择所在区") !== 0 && b === "") {
                $("#map-wrapper .field button").text("请输入建筑名");
                return false;
            }
            else if (a.indexOf("选择所在区") === 0) {
                $("#map-wrapper .field button").text("请选择区域");
                return false;
            }
            else return true;
        }
        else {
            // 未点击
            return false;
        }
    }

    function placeSearch() {
        var MSearch;
        AMap.service(["AMap.PlaceSearch"], function () {
            MSearch = new AMap.PlaceSearch({pageSize: 10, pageIndex: 1, city: "0571"});
            MSearch.search(address, function (status, result) {
                if (status === "complete" && result.info === "OK") {
                    $("#map-wrapper .field button").text("查询成功");
                    keywordSearch_CallBack(result);
                }
                else {
                    $("#map-wrapper .field button").text("查询失败");
                }

            })
        });
    }

    function addmarker(i, d) {
        var lngX = d.location.getLng();
        var latY = d.location.getLat();
        var markerOption = {
            map: map,
            icon: "http://webapi.amap.com/images/" + (i + 1) + ".png",
            position: new AMap.LngLat(lngX, latY),
            topWhenMouseOver: true
        };
        var mar = new AMap.Marker(markerOption);
        marker.push(new AMap.LngLat(lngX, latY));
        var infoWindow = new AMap.InfoWindow({
            content: '<h3><font color="#00a6ac">  ' + (i + 1) + ". " + d.name + "</font></h3>" + TipContents(d.type, d.address, d.tel),
            size: new AMap.Size(300, 0),
            autoMove: true,
            offset: new AMap.Pixel(0, -20)
        });
        windowsArr.push(infoWindow);
        var aa = function (e) {
            infoWindow.open(map, mar.getPosition())
        };
        AMap.event.addListener(mar, "mouseover", aa);
    }

    function keywordSearch_CallBack(data) {
        var resultStr = "";
        var poiArr = data.poiList.pois;
        var resultCount = poiArr.length;
        for (var i = 0; i < resultCount; i++) {
            resultStr += "<div id='divid" + (i + 1) + "' onmouseover='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ',this)\' style="font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;"><table><tr><td><img src="http://webapi.amap.com/images/' + (i + 1) + '.png"></td>' + '<td><h3><font color="#00a6ac">名称: ' + poiArr[i].name + "</font></h3>";
            resultStr += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + "</td></tr></table></div>";
            addmarker(i, poiArr[i])
        }
        map.setFitView();
    }

    function TipContents(type, address, tel) {
        if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
            type = "暂无"
        }
        if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
            address = "暂无"
        }
        if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
            tel = "暂无"
        }
        var str = "  地址：" + address + "<br />  电话：" + tel + " <br />  类型：" + type;
        return str;
    }

    function openMarkerTipById1(pointid, thiss) {
        thiss.style.background = "#CAE1FF";
        windowsArr[pointid].open(map, marker[pointid]);
    }

    function onmouseout_MarkerStyle(pointid, thiss) {
        thiss.style.background = "";
    }
}

var unitNum = 0;
function onNewUnitClicked() {
    // 新建户型
    var currentUnitNum = unitNum + 1;
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
    str += "<div class='two wide column'><button class='ui button' onclick='onUpload(2," + currentUnitNum + ")'>上传图片</button></div>";
    str += "<div class='four wide column'><div class='field'>";
    str += "<img class='ui image' src='http://7xked6.com2.z0.glb.qiniucdn.com/default_unit.png'>";
    str += "</div></div></div></fieldset>";

    $("#units").append(str);
    $("#units_num span").text(currentUnitNum);
    unitNum++;
}

var imagesNum = 0;
function onNewImageClicked() {
    // 添加新图片
    var currentImageNum = imagesNum + 1;
    var defaultImageNum = "图片" + currentImageNum;
    var html = $("#content-images").html(); // 获取已存在的html
    var str = "<div class='field' id='image_" + currentImageNum + "'>";
    str += "<div class='ui action input'>";
    //str += "<div class='image-link' hidden>http://img.static.mzapp.info/default_unit.png</div>";
    str += "<input type='text' placeholder='图片名称' value='" + defaultImageNum + "'>";
    str += "<button class='ui teal right labeled icon button' onclick='onUpload(3," + currentImageNum + ")'><i class='upload icon'></i> 上传</button>";
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
    $("#images_num span").text(currentImageNum);
    $("#content-images").html(str);
    imagesNum++
}