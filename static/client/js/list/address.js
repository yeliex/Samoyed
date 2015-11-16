// 根据接收到的参数制定地址
//var address = {
//    target: "list",
//    keyword: ""
//};
//$(function () {
//    var a = parseURL(location.href); // 解析地址
//    address.target = (a.params.target) ? (a.params.target) : "list";
//    address.keyword = (a.params.keyword != null && address.target != "search") ? (a.params.keyword) : "";
//
//})
//console.log(address);

// 接收到的地址ex: mizhi.pub/list/013100510101_01_keyword.html
// 地址约定: domain/list/params.html
//params约定: {
//    由三组参数组成,第一组参数必填,后续可以依次省缺
//    固定参数: {
//        target: 两位数字,代表目的 00: 列表(所有) 01: 搜索
//        district: 6位数字,区邮编
//        size: 两位数字,面积范围
//        price: 两位数字,价格范围
//    }
//    省缺参数1: 筛选条件 {
//        00
//    }
//    省缺参数2: 搜索关键字 {
//        keyword: 经过转义以后的关键字字符串
//    }
//}

var address = initAddress();

function initAddress() {
    var add;
    var f = parseURL(location.href).file.split(".")[0].split("_"); // 获取三组参数
    if (location.href.split("/").length === 4 || location.href.split("/")[4] == "") {
        f = new Array("000000000000","00","");
    }
    add = {
        base: {
            target: getTarget(f[0].slice(0, 2)),
            district: f[0].slice(2, 8),
            size: f[0].slice(8, 10),
            price: f[0].slice(10, 12)
        },
        extract: "",
        keyword: (decodeURI(f[2]) && getTarget(f[0].slice(0, 2)) === "search") ? (decodeURI(f[2])) : ""
    };
    return add;
}

function getTarget(code) {
    var a;
    switch (code) {
        case "01":
            a = "search";
            break;
        default:
            a = "list";
            break;
    }
    return a;
}