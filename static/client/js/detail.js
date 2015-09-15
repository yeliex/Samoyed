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

$('.ui.dropdown').dropdown();