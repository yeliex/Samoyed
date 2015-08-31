/**
 * Created by yeliex on 15/7/20.
 */
(function(){
    $('#selection').popup({
        inline   : true,
        hoverable: true,
        exclusive: true,
        position : 'bottom left'
    });
    $('#qrCode').popup({
        inline   : true,
        hoverable: true,
        exclusive: true,
        position : 'bottom left'
    });
})();
(function() {
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
        function(){
            // District Select
            var $selected = $(this);
            if(!$selected.hasClass("active"))
            {
                // Not Selected
                $(".ye-select-size").removeClass("active");
                $selected.addClass("active");
            }
        });
    $(".ye-select-price").click(
        function(){
            // District Select
            var $selected = $(this);
            if(!$selected.hasClass("active"))
            {
                // Not Selected
                $(".ye-select-price").removeClass("active");
                $selected.addClass("active");
            }
        })
})();
function onSelection(){
    var districtSelection = $(".ye-select-district.active")[0].name;
    var sizeSelection = $(".ye-select-size.active")[0].name;
    var priceSelection = $(".ye-select-price.active")[0].name;
    var keywordsInput = $("#ye-selection-keyword").val();
    if(keywordsInput === "")
    {
        if(districtSelection === "all" && sizeSelection === "all" && priceSelection === "all")
        {
            window.location.href = "/list/?target=all";
        }
        else
        {
            window.location.href = "/list/?target=list&district="+districtSelection+"&size="+sizeSelection+"&price="+priceSelection;
        }
    }
    else
    {
        if(districtSelection === "all" && sizeSelection === "all" && priceSelection === "all")
        {
            window.location.href = "/list/?target=search&keyword="+keywordsInput;
        }
        else
        {
            window.location.href = "/list/?target=search&district="+districtSelection+"&size="+sizeSelection+"&price="+priceSelection+"&keyword="+keywordsInput;

        }
    }
}

(function() {
    var windowHeight = window.innerHeight;
    var itemHeight =  $("#main-wrapper").height();
    var offsetHeight = (windowHeight - itemHeight) / 2;
    if(offsetHeight >= 126)
    {
        $("#main-wrapper").css('top',offsetHeight);
    }
    else
    {
        $("#main-wrapper").css('top',"126px");
    }

//        offsetHeight = $("#main-wrapper").offset().top;
//        var footerOffset = offsetHeight+itemHeight;
//        console.log(footerOffset);
//        $("#footer-wrapper").css('top',footerOffset);

})();

function onPrimerCLicked(){
    var searchKeyword = $("#ye-main-search").val();

    if(searchKeyword !== null)
    {
        $("#ye-select-keyword").val(searchKeyword);
    }
    $('#selection').popup('show');
}
function onSearchClicked()
{
    var str = $("#ye-main-search").val();
    if(str === "")
    {
        window.location.href = "/list";
    }
    else
    {
        //console.log(str);
        window.location.href = "/list/?target=search&keyword="+str;
    }
}
$(function(){
    $(window).scroll(function(){  // Run when window scroll
        var scrollt = document.documentElement.scrollTop + document.body.scrollTop; // Get height of the scroll
        //var style = $("#ye-nav").attr('class');
        if( scrollt >0 ){  // If the height over 0px, show the button
            var style ="ye-nav nav-bar fixed inverted"; // fixed
        }else{
            var style = "ye-nav nav-bar"; // Not fixed
        }
        $("#ye-nav").attr('class',style);
    });
});