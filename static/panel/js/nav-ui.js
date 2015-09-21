$(function () {
    $(".ye-main .menu .item").tab({
        auto: true,
        cache: true, // 缓存
        context: '.ye-main',
        evaluateScripts: true,
        apiSettings: {
            loadingDuration: 300
        },
        path: 'contents.php?target=',
        onVisible: function (tabPath) {
            //onTabChanged(tabPath);
        }
    });

    $(".ye-main .menu .item").tab('change tab', target);
    //onTabChanged();
});

function onTabChanged(path) {
    if (path != target) {
        location.href = location.origin + "/" + path;
    }
}
