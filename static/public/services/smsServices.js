//SMS服务相关信息
function verifySend(phone) {
    var data;
    var req = $.ajax("http://api.mzapp.info/appointment/sendVarify?protocol=json", {
        method: "POST",
        async: false,
        data: {
            phone: phone
        }
    });
    req.complete(function (returnData) {
        data = $.parseJSON(returnData.responseText);
        user.varifyCode = data.overview.varifyCode;
    });
    return data;
}