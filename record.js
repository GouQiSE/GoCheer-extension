/**
 * Created by ZHY on 2016/12/12.
 */
/**
 * Created by ZHY on 2016/12/12.
 */
var login_state;

$(function () {
    $.ajax({
        type: "get",
        url: "http://gocheer.donggu.me/userInfo",
        success: function (item) {
            obj = eval(item);
            if (obj.user == null) {
                $("#not_logged_in").css("display", "block");
                login_state = false;
            }
            else {
                $("#login_success").css("display", "block");
                login_state = true;
                $("#wordsum").html(obj.user.wordsum);
                $("#scoresum").html(obj.user.scoresum);
                $("#score").html(obj.user.score);
                $("#alias").html(obj.user.alias);
                $("#href_My_Profile").attr("href","http://gocheer.donggu.me/home/"+obj.user.username);

            }
        }
    })
})

$(function () {
    $("#logout").unbind("click").bind("click", function (e) {
        $.ajax({
            type: "post",
            url: "http://gocheer.donggu.me/logout",
            data: {extension: "true"},
            success: function () {
                console.log("logout success.");
                $("#not_logged_in").css("display", "block");
                $("#login_success").css("display", "none");
            }
        })
    })

})

$(function () {
    $("#not_logged_in").submit(function () {
        return false;
    }); // 禁用 form 提交，页面不会跳转
    $("#subbutton").click(function () {
        var param = {}; // 组装发送参数，下面只是举个例，请按需要修改
        param['username'] = $('#not_logged_in input[name=username]').val();
        param['extension'] = $('#not_logged_in input[name=extension]').val();
        param['password'] = $('#not_logged_in input[name=password]').val();

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://gocheer.donggu.me/Login",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache",
            },
            "data": param
        }

        $.ajax(settings).done(function (response) {
            $("#not_logged_in").css("display", "none");
            $.ajax({
                type: "get",
                url: "http://gocheer.donggu.me/userInfo",
                success: function (item) {
                    obj = eval(item);
                    if (obj.user == null) {
                        $("#not_logged_in").css("display", "block");
                        login_state = false;
                    }
                    else {
                        $("#login_success").css("display", "block");
                        login_state = true;
                        $("#wordsum").html(obj.user.wordsum);
                        $("#scoresum").html(obj.user.scoresum);
                        $("#score").html(obj.user.score);
                        $("#alias").html(obj.user.alias);
                    }
                }
            })
        });

    });
});