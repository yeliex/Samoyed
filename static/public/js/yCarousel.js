/**
 *  yCarousel
 *  一款简单的Carousel Jquery插件
 *
 *  Author: yeliex
 *          yeliex.com
 *  website: work.yeliex.com/carousel
 *
 *  version :1.2
 *  date: 2015-09-18
 */
$(function () {
    // 首先获取页面上的所有.carousel对象
    var object = $(".carousel");
    var objectNum = object.length;
    // 循环对每个carousel对象进行处理
    for (var i = 0; i < objectNum; i++) {
        doList(object[i]);
    }

    function doList(target) {
        // 创建一个公共变量来处理
        var obj = new InitList(target);
        // 首先设置默认要显示的图片
        initSet(obj);
        obj.current = 1;

        // 开始循环处理
        setInterval(function () {
            // 获取下一个的序号
            var next = Number(obj.current) + 1;
            if (next == (obj.list.length + 1)) next = 1;
            // 设置图片
            var item = obj.list[next - 1];
            setBG(item.img, item.link, obj.target);
            if (obj.content.content == "true") {
                var content = obj.content.list[next - 1];
                setContent(obj.target, content.a, content.b, content.btn);
            }
            else {
                $(target).html(" ");
            }
            obj.current = next;
        }, 4000);
    }

    function InitList(target) {
        var itemList = $(target).children('.list');
        this.target = $(target);
        this.active = getActive(itemList);
        this.list = getList(itemList);
        this.current = 0;
        this.content = getContent(itemList, target);
        function getActive(list) {
            for (var i = 0; i < list.length; i++) {
                var item = $(list[i]);
                if (item.hasClass('active')) {
                    return item;
                }
            }
            // 如果没有item有active样式,则指定为第一个
            return $(list[0]);
        }

        function getList(list) {
            var result = new Array();
            for (var i = 0; i < list.length; i++) {
                result[i] = {
                    img: $(list[i]).attr('data-img'),
                    link: $(list[i]).attr('data-link')
                }
            }
            return result;
        }

        function getContent(list, target) {
            var content = $(target).attr('data-content');
            if (content) {
                // 需要内容的时候,循环读取内容
                var result = new Array();
                for (var i = 0; i < list.length; i++) {
                    result[i] = {
                        a: $(list[i]).attr('data-content').split("/")[0],
                        b: $(list[i]).attr('data-content').split("/")[1],
                        btn: $(list[i]).attr('data-btn')
                    }
                }
            }

            return {
                content: content,
                list: result
            }
        }
    }

    function initSet(obj) {
        var item = obj.active;
        var target = obj.target;
        var link = item.attr('data-link');
        var img = item.attr('data-img');
        // 设置属性
        var styleStr = "background: url('" + img + "') top center no-repeat; background-size: cover;";
        if (link != null) {
            styleStr += " cursor: pointer !important;";
            // 有链接的时候需要设置点击事件
            target.click(function () {
                window.open(link);
            })
        }
        target.attr('style', styleStr);
        if (obj.content.content == "true") {
            var a = item.attr('data-content').split("/")[0];
            var b = item.attr('data-content').split("/")[1];
            var btn = item.attr('data-btn');
            setContent(obj.target, a, b, btn);
        }
        else {
            $(target).html(" ");
        }
    }

    function setBG(img, link, target) {
        // 设置属性
        target.unbind("click");
        var styleStr = "background: url('" + img + "') top center no-repeat; background-size: cover;";
        if (link != null) {
            styleStr += " cursor: pointer !important;";
            // 有链接的时候需要设置点击事件
            target.click(function () {
                window.open(link);
            })
        }
        target.attr('style', styleStr);
    }

    function setContent(target, a, b, btn) {
        // 设置内容
        // 需要先隐藏再显示以避免闪烁,如果图片较大或加载慢需要增加动画hide(),show()时间
        $(target).children(".content").children().hide();
        var htmlStr = "<div class='content'>";
        if (a != null && b != null) {
            htmlStr += "<div class='a'>" + a + "</div>";
            htmlStr += "<div class='b'>" + b + "</div>";
        }
        htmlStr += (btn == null)?(" "):("<div class='ui huge button inverted'>"+btn+"</div>");
        htmlStr += "</div>";
        $(target).html(htmlStr);
        $(target).children(".content").children().show();
    }
});