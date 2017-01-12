

var obj;
var login_state1;
var obj2;
function onRequest(request, sender, callback) {
    console.log(request);
    console.log(sender);

    if (request.funct=="ask_for_loginstate"){
        $.ajax({
            type: "get",
            url: "http://gocheer.donggu.me/userInfo",
            success: function (item) {
                obj = eval(item);
                if (obj.user == null) {
                    login_state1 = false;
                }
                else {
                    login_state1 = true;
                }
                callback(login_state1);//将登录状态状态发给select.js
            }
        })
    }

    if (request.funct=="ask_for_achievement"){
        $.ajax({
            type: "get",
            url: "http://gocheer.donggu.me/newRecord?word="+request.word,
            success: function (item) {
                obj2 = eval(item);
                callback(obj2);//将得到的achivement信息发给select.js
            }
        })
    }

}

chrome.extension.onRequest.addListener(onRequest);

