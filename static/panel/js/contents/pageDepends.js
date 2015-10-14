var args = decodeURI(location.href).split("/");
// args至少会有三个参数,前三个参数分别为"http"," ","doman.name",需要抛弃
var argLength = args.length;
if (args[3] == "panel") {
    // 不允许/panel文件夹访问
    location.href = "http://panel.mzapp.info";
}
else if (argLength > 4) {
    // 存在多个参数
    location.href = location.origin + "/" + args[3];
}
else if (argLength <= 4 && argLength >= 3) {
    // 当没有参数/只有一个参数的时候
    var arg = args[3]; // arg为第四个参数或为空,为避免输入差异全部转换为小写
    //console.log(arg);
    var target = "index";
    // 根据中文输入得出英文
    switch (arg) {
        case "首页":
        {
            arg = "indexPage";
            break;
        }
        case "新建":
        {
            arg = "newBillPage";
            break;
        }
        case "管理":
        {
            arg = "billManagerPage";
            break;
        }
        case "预约":
        {
            arg = "appointManagerPage";
            break;
        }
        case "用户":
        {
            arg = "userManagerPage";
            break;
        }
        case "员工":
        {
            arg = "workerManagerPage";
            break;
        }
        case "消息":
        {
            arg = "messagePage";
            break;
        }
        default:
        {
            // 当输入为英文的时候
            break;
        }
    }
    arg = arg.toLowerCase();
    switch (arg) {
        case "index":
        {
            target = "indexPage";
            break;
        }
        case "indexpage":
        {
            target = "indexPage";
            break;
        }

        case "new":
        {
            target = "newBillPage";
            break;
        }
        case "newbill":
        {
            target = "newBillPage";
            break;
        }
        case "newbillpage":
        {
            target = "newBillPage";
            break;
        }

        case "billmanager":
        {
            target = "billManagerPage";
            break;
        }
        case "billmanagerpage":
        {
            target = "billManagerPage";
            break;
        }

        case "appoint":
        {
            target = "appointManagerPage";
            break;
        }
        case "appointmanager":
        {
            target = "appointManagerPage";
            break;
        }
        case "appointmanagerpage":
        {
            target = "appointManagerPage";
            break;
        }

        case "user":
        {
            target = "userManagerPage";
            break;
        }
        case "usermanager":
        {
            target = "userManagerPage";
            break;
        }
        case "usermanagerpage":
        {
            target = "userManagerPage";
            break;
        }
        case "worker":
        {
            target = "workerManagerPage";
            break;
        }
        case "workermanager":
        {
            target = "workerManagerPage";
            break;
        }
        case "workermanagerpage":
        {
            target = "workerManagerPage";
            break;
        }

        case "message":
        {
            target = "messagePage";
            break;
        }
        case "messagepage":
        {
            target = "messagePage";
            break;
        }

        default:
        {
            // 默认打开首页
            target = "indexPage";
        }
    }
}