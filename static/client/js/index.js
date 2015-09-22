$(".ui.dropdown").dropdown();
$(function () {
    $(window).scroll(function () {
        var scrollt = $(document).scrollTop() + $('body').scrollTop();
        if (scrollt > 0 && !($('#ye-nav').hasClass('fixed'))) {
            $('#ye-nav').addClass('fixed');
        }
        else if (!(scrollt > 0) && $("#ye-nav").hasClass('fixed')) {
            $('#ye-nav').removeClass('fixed');
        }
    });
    // 搜索框
    $(window).scroll(function () {
        var scrollt = $(document).scrollTop();
        var height = $('header').height() + $('.preview-wrapper .search-bar .input').height() - $('#ye-nav').height();
        if (scrollt > height && !($('#ye-nav').hasClass('search'))) {
            $('#ye-nav').addClass('search');
        }
        else if (!(scrollt > height) && $('#ye-nav').hasClass('search')) {
            $('#ye-nav').removeClass('search');
        }
    });
});
$(".search-ad li").click(function (e) {
    var text = $(e.target).text();
    $(".search-bar input").val(text);
});

window.ySearch = {
    keyword: "",
    search: false,
    district: "0",
    size: "0",
    price: "0"
};
// 查找房源输入框部分内容
$(function () {
    // 关键字部分
    $(".search-bar input").bind('input', function ($e) {
        var target = $($e.target);
        var parent = target.parent().parent();
        if (parent.hasClass('nav')) {
            // 修改的是nav,设置preview
            $(".search-bar.preview input").val(target.val());
        }
        else if (parent.hasClass('preview')) {
            // preview,nav
            $(".search-bar.nav input").val(target.val());
        }
    });
    // 选择区域
    $(".search-bar .ui.dropdown.district").dropdown({
        onChange: function (value) {
            // 简单粗暴: 直接设置district的值都为value
            $(".search-bar .ui.dropdown.district").dropdown('set selected', value);
        }
    });
    // 选择价格
    $(".search-bar .ui.dropdown.price").dropdown({
        onChange: function (value) {
            // 简单粗暴: 直接设置price的值都为value
            $(".search-bar .ui.dropdown.price").dropdown('set selected', value);
        }
    });
    // 选择面积
    $(".search-bar .ui.dropdown.size").dropdown({
        onChange: function (value) {
            // 简单粗暴: 直接设置size的值都为value
            $(".search-bar .ui.dropdown.size").dropdown('set selected', value);
        }
    });
});
$(function () {
    // 搜索/列表按钮点击事件
    $(".search-bar .search.button").click(function () {
        window.ySearch.keyword = $(".search-bar.nav input").val();
        window.ySearch.search = !(window.ySearch.keyword === "");
        window.ySearch.district = ($(".search-bar.nav .ui.dropdown.district").dropdown('get value') === "") ? "0" : $(".search-bar.nav .ui.dropdown.district").dropdown('get value');
        window.ySearch.price = ($(".search-bar.nav .ui.dropdown.price").dropdown('get value') === "") ? "0" : $(".search-bar.nav .ui.dropdown.price").dropdown('get value');
        window.ySearch.size = ($(".search-bar.nav .ui.dropdown.size").dropdown('get value') === "") ? "0" : $(".search-bar.nav .ui.dropdown.size").dropdown('get value');
        console.log(window.ySearch);
        var link = location.origin + "/list";
        link += "?target=" + ((window.ySearch.search) ? "search" : "list");
        link += (window.ySearch.search) ? ("&keyword=" + window.ySearch.keyword) : "";
        link += "&district=" + window.ySearch.district;
        link += "&price=" + window.ySearch.price;
        link += "&size=" + window.ySearch.size;
        location.href = link;
    });
    $(".search-bar .all.button").click(function () {
        location.href = location.origin + "/list";
    });
});