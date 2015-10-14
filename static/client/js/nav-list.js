String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
};

(function () {
    $('#selection').popup({
        inline: true,
        hoverable: true,
        exclusive: true,
        position: 'bottom left'
    });
    $('#qrCode').popup({
        inline: true,
        hoverable: true,
        exclusive: true,
        position: 'bottom left'
    });
})();
(function () {
    $(".ye-select-district").click(
        function () {
            // District Select
            var $selected = $(this);
            if (!$selected.hasClass("active")) {
                // Not Selected
                $(".ye-select-district").removeClass("active");
                $selected.addClass("active");
            }
        });
    $(".ye-select-size").click(
        function () {
            // District Select
            var $selected = $(this);
            if (!$selected.hasClass("active")) {
                // Not Selected
                $(".ye-select-size").removeClass("active");
                $selected.addClass("active");
            }
        });
    $(".ye-select-price").click(
        function () {
            // District Select
            var $selected = $(this);
            if (!$selected.hasClass("active")) {
                // Not Selected
                $(".ye-select-price").removeClass("active");
                $selected.addClass("active");
            }
        })
})();
function onSelection() {
    var districtSelection = $(".ye-select-district.active")[0].name;
    var sizeSelection = $(".ye-select-size.active")[0].name;
    var priceSelection = $(".ye-select-price.active")[0].name;
    var keywordsInput = $("#ye-selection-keyword").val();
    if (keywordsInput === "") {
        if (districtSelection === "all" && sizeSelection === "all" && priceSelection === "all") {
            window.location.href = "/list/?target=all";
        }
        else {
            window.location.href = "/list/?target=list&district=" + districtSelection + "&size=" + sizeSelection + "&price=" + priceSelection;
        }
    }
    else {
        if (districtSelection === "all" && sizeSelection === "all" && priceSelection === "all") {
            window.location.href = "/list/?target=search&keyword=" + keywordsInput;
        }
        else {
            window.location.href = "/list/?target=search&district=" + districtSelection + "&size=" + sizeSelection + "&price=" + priceSelection + "&keyword=" + keywordsInput;

        }
    }
}

function onPrimerCLicked() {
    var searchKeyword = $("#ye-main-search").val();

    if (searchKeyword !== null) {
        $("#ye-select-keyword").val(searchKeyword);
    }
    $('#selection').popup('show');
}
function onSearchClicked() {
    var str = $("#ye-main-search").val();
    if (str === "") {
        window.location.href = "/list";
    }
    else {
        //console.log(str);
        window.location.href = "/list/?target=search&keyword=" + str;
    }
}
// 初始化折叠菜单
$(function () {
    $(".ye-list .ye-side .accordion").accordion();
});

// 筛选点击监听
$(function () {
    $(".ye-side.menu .accordion .selection.list .item").click(function () {
        var clickedItem = $(this); // 将this对应的dom对象转换为js对象
        var clickedText = clickedItem.text().trim();
        //console.log(clickedText);

        if (clickedItem.hasClass('active')) {
            // 已经是当前选项
        }
        else {
            // 需要重新设定筛选条件
            var parentItem = clickedItem.parentsUntil(".ye-side.menu");
            var parentTarget = $(parentItem[2]).attr('id');
            switch (parentTarget) {
                case 'area':
                    changeArea(clickedItem, clickedText);
                    break;
                case 'price':
                    changePrice(clickedItem, clickedText);
                    break;
                case 'size':
                    changeSize(clickedItem, clickedText);
                    break;
            }
        }
    });
});

function changeArea(target, value) {
    $(".ye-side.menu .accordion.area .selection.list .item").removeClass('active');
    target.addClass('active');
    var current = getCurrnentConditions();
    current.area = value;
    setNewConditions(current);
}
function changePrice(target, value) {
    $(".ye-side.menu .accordion.price .selection.list .item").removeClass('active');
    target.addClass('active');
    var current = getCurrnentConditions();
    current.price = value;
    setNewConditions(current);
}
function changeSize(target, value) {
    $(".ye-side.menu .accordion.size .selection.list .item").removeClass('active');
    target.addClass('active');
    var current = getCurrnentConditions();
    current.size = value;
    setNewConditions(current);
}
