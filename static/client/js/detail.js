/**
 * Created by yeliex on 15/7/21.
 */
$(function () {
    var wrapper = $(".seg-wrapper");
    var wrapperHeight = wrapper.height();
    var item = $(".segament");
    var itemHeight = item.height();

    $(window).scroll(function () {
        subNavFixed(wrapper, wrapperHeight, item, itemHeight);
        appointmentPos();
    })
});

function subNavFixed(wrapper, wrapperHeight, item, itemHeight) {

    var navHeight = $(".ye-nav").height();
    var offsetHeight = itemHeight - navHeight - 120;
    var scrollt = $(document).scrollTop();
    //console.log(offsetHeight+","+scrollt);
    if (scrollt >= offsetHeight) {
        if (wrapper.attr('class') != "seg-wrapper fixed") {
            wrapper.attr('class', "seg-wrapper fixed");
            wrapper.css('top', navHeight);
        }
    }
    else if (scrollt < offsetHeight) {
        if (wrapper.attr('class') === ("seg-wrapper fixed")) {
            wrapper.attr('class', "seg-wrapper");
            wrapper.css('top', "0");
        }
    }
}

function appointmentPos() {
    var imgItem = $(".img-list");
    if (!imgItem) {
        imgItem = $(".detail-img");

    }
    var appointmentItem = $(".appointment");

    var imgOffsetTop = imgItem.offset().top;
    var appointmentHeight = appointmentItem.height();
    var appointmentOffsetTop = appointmentItem.offset().top;

    var scroll = $(document).scrollTop();

    if (imgOffsetTop - appointmentOffsetTop === appointmentHeight) {
        //console.log(imgOffsetTop + "-" + appointmentOffsetTop + "=" + (imgOffsetTop - appointmentOffsetTop) + ",===" + appointmentHeight);
        if (appointmentItem.css('display') != "none") {
            appointmentItem.hide();
        }
    }
    else if (imgOffsetTop - appointmentOffsetTop > appointmentHeight) {
        //console.log(imgOffsetTop + "-" + appointmentOffsetTop + "=" + (imgOffsetTop - appointmentOffsetTop) + ",>" + appointmentHeight);
        if (appointmentItem.css('display') != "block" && scroll < $(".detail-desc").offset().top - appointmentHeight) {
            appointmentItem.show();
        }
    }
    else {
        //console.log(imgOffsetTop + "-" + appointmentOffsetTop + "=" + (imgOffsetTop - appointmentOffsetTop) + ",<" + appointmentHeight);
        if (appointmentItem.css('display') != "none") {
            appointmentItem.hide();
        }
    }

}

function getUserInfo(value) {
    // 如果存在错误提示,输入前关闭
    if ($('#user_phone_error').hasClass('visible')) {
        $('#user_phone_error').closest('.message').transition('hide', 500);
    }
    console.log(length);
}

$('.ui.dropdown').dropdown();
$('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade', 500);
});
$('#user_phone').on('click', function () {
    // 如果存在错误提示,点击输入框清空内容,开始输入再关闭提示
    if ($('#user_phone_error').hasClass('visible')) {
        $('#user_phone input').val("");
    }
});

(function () {
    $('#data-select').dropdown({
        onChange: function (text) {
            dataSelected(text);
        }
    });
})();
function dataSelected(text) {
    console.log(text);
    if (text === "其他") {
        $("#time-select-menu").html("<div class='item'>待定</div>");
    }
    else {
        $("#time-select-menu").html("<div class='item'>上午</div><div class = 'item'>下午</div><div class ='item'>晚上</div><div class='ui divider'></div><div class ='item'>待定</div>");
    }

}
