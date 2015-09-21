var currentArgs;
$(function () {
    currentArgs = getCurrnentConditions();
    var a = $(".accordion .selection.list.area");
    if (currentArgs.area == "all") {
        var e = a.children().first();
        if (!e.hasClass("active")) {
            e.addClass("active")
        }
    } else {
        var b = a.children();
        for (var d = 1; d < b.length - 1; d++) {
            if ($($(b[d]).children(".content")).text() == currentArgs.area) {
                b.removeClass("active");
                $(b[d]).addClass("active")
            }
        }
    }
    var c = $(".accordion .selection.size");
    if (currentArgs.size == "all") {
        e = c.children().first();
        if (!e.hasClass("active")) {
            e.addClass("active")
        }
    } else {
        b = c.children();
        for (d = 1; d < b.length - 1; d++) {
            if ($($(b[d]).children(".content")).text() == currentArgs.size) {
                b.removeClass("active");
                $(b[d]).addClass("active")
            }
        }
    }
    var f = $(".accordion .selection.price");
    if (currentArgs.price == "all") {
        e = f.children().first();
        if (!e.hasClass("active")) {
            e.addClass("active")
        }
    } else {
        b = f.children();
        for (d = 1; d < b.length - 1; d++) {
            if ($($(b[d]).children(".content")).text() == currentArgs.price) {
                b.removeClass("active");
                $(b[d]).addClass("active")
            }
        }
    }
});
function getCurrnentConditions() {
    var b = parseURL((location.href));
    var a = b.params;
    var c = b.path.split("/").splice(1, 2);
    if (c[1] != "search") {
        c[1] = "list";
        if (location.hash == "") {
            c[1] = "all"
        }
    }
    a.area = (a.area) ? decodeURI(a.area) : "all";
    a.size = (a.size) ? decodeURI(a.size) : "all";
    a.price = (a.price) ? decodeURI(a.price) : "all";
    a.page = c[0];
    a.target = c[1];
    return a
}
function setNewConditions(a) {
    //location.href = encodeURI(location.origin + "/list/" + a.target + "?area=" + ((!a.area) ? "all" : a.area) + "&size=" + ((!a.size) ? "all" : a.size) + "&price=" + ((!a.price) ? "all" : a.price))
    location.href = encodeURI(location.origin + "/list/" + "?area=" + ((!a.area) ? "all" : a.area) + "&size=" + ((!a.size) ? "all" : a.size) + "&price=" + ((!a.price) ? "all" : a.price))
}
function getDistrict(b, a) {
    var c;
    if (a === 1) {
        switch (b) {
            case"上城区":
                c = "310002";
                break;
            case"下城区":
                c = "310006";
                break;
            case"江干区":
                c = "310016";
                break;
            case"310011":
                c = "拱墅区";
                break;
            case"西湖区":
                c = "310013";
                break;
            case"滨江区":
                c = "310051";
                break;
            case"萧山区":
                c = "311201";
                break;
            case"余杭区":
                c = "311100";
                break;
            default:
                c = "0";
                break;
        }
    } else {
        switch (b) {
            case"310002":
                c = "上城区";
                break;
            case"310006":
                c = "下城区";
                break;
            case"310016":
                c = "江干区";
                break;
            case"310011":
                c = "拱墅区";
                break;
            case"310013":
                c = "西湖区";
                break;
            case"310051":
                c = "滨江区";
                break;
            case"311201":
                c = "萧山区";
                break;
            case"311100":
                c = "余杭区";
                break;
            default:
                c = "杭州市";
                break;
        }
    }
    return c;
}
function getSize(a, c) {
    var b;
    if (c === 1) {
        switch (a) {
            case"0-100m²":
                b = "1";
                break;
            case"100-200m²":
                b = "2";
                break;
            case"200-300m²":
                b = "3";
                break;
            case"300-500m²":
                b = "4";
                break;
            case"500-1000m²":
                b = "5";
                break;
            case"1000+m²":
                b = "6";
                break;
            default:
                b = "0";
                break
        }
    } else {
        switch (a) {
            case"1":
                b = "0-100m²";
                break;
            case"2":
                b = "100-200m²";
                break;
            case"3":
                b = "200-300m²";
                break;
            case"4":
                b = "300-500m²";
                break;
            case"5":
                b = "500-1000m²";
                break;
            case"6":
                b = "1000+m²";
                break;
            default:
                b = "all";
                break
        }
    }
    return b
}
function getPrice(a, b) {
    var c;
    if (b === 1) {
        switch (a) {
            case"1-2":
                c = "1";
                break;
            case"2-3":
                c = "2";
                break;
            case"3-4":
                c = "3";
                break;
            case"4-5":
                c = "4";
                break;
            case"6-7":
                c = "5";
                break;
            case"7-8":
                c = "6";
                break;
            default:
                c = "0";
                break
        }
    } else {
        switch (a) {
            case"1":
                c = "0-100m²";
                break;
            case"2":
                c = "100-200m²";
                break;
            case"3":
                c = "200-300m²";
                break;
            case"4":
                c = "300-500m²";
                break;
            case"5":
                c = "500-1000m²";
                break;
            case"6":
                c = "1000+m²";
                break;
            default:
                c = "all";
                break
        }
    }
    return c;
}