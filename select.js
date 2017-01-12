/**
 * Created by ZHY on 2016/12/12.
 */
/**
 * Created by ZHY on 2016/12/2.
 */
var log_state;
var ach_no = 0;
var ach_obj;

var text_result_box =
        '<div id="GoCheer-main_box" style="display: none;">' +
        '    <div class="GoCheer-main_title" id="GoCheer-main_title" style="cursor: default;">' +
        '        <a href="javascript:;" id="GoCheer-gb" class="GoCheer-gb" title="关闭"></a>' +
        '        <i class="GoCheer-logo"></i>' +
        '    </div>' +
        '    <div class="GoCheer-search" id="ICIBA_HUAYI_input"></div>' +
        '    <div class="GoCheer-main_cont" id="GoCheer-main_cont" style="display: block;">' +
        '        <div id="GoCheer-title" class="GoCheer-title" style="display:none">hold</div>' +
        '        <div id="GoCheer-dict_main">' +
        '            <div class="GoCheer-dictbar" style="padding-top: 6px;">' +
        '                <div class="GoCheer-simple">' +
        '                    <div class="GoCheer-tab_list"></div>' +
        '                    <div class="GoCheer-dict_content">' +
        '                        <div class="GoCheer-group_prons">' +
        '                            <div class="GoCheer-group_pos">' +
        '                            </div>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>'
    ;

var text_achivement_box =
        '<div id="popHead">' +
        '    <a id="popClose" title="关闭"></a>' +
        '</div>' +
        '<div id="popContent">' +
        '    <div id="img_wrap">' +
        '        <img id="popimg">' +
        '    </div>' +
        '        <div id="info_wrap">' +
        '        <dl id="ach_dl">' +
        '            <dd id="popTitle">New Achievement Established:</dd>' +
        '            <dd id="popAchName">成就名称</dd>' +
        '            <dd id="popIntro">成就描述</dd>' +
        '            <dd id="popBonus">Bonus points:</dd>' +
        '        </dl>' +
        '    </div>' +
        '    <p id="popMore"><a href="http://gocheer.donggu.me/login" target="_blank">view more</a></p>' +
        '</div>'
    ;

function ask_for_loginstate(data) {
    log_state = data;
}

function ask_for_achivement(data) {
    ach_obj = data;
    if (ach_obj.achievement != null) {
        for (var i = 0; i < ach_obj.achievement.length; i++) {
            var url_image1=chrome.runtime.getURL("images/default.png");
            var url_image2=chrome.runtime.getURL("images/icon_close.png");
            var p1 = document.createElement("div");
            $("#GoCheer_PopWrap").append(p1);
            p1.setAttribute("id", "pop" + ach_no);
            $("#pop" + ach_no).addClass("achievement_main_box");
            p1.style.display = "none";
            $("#pop" + ach_no).append(text_achivement_box);
            $("#pop" + ach_no).find("#popimg").attr("src",url_image1);
            $("#pop" + ach_no).find("#popClose").css("background-image","url("+url_image2+")");
            new Pop(ach_obj.achievement[i].name, ach_obj.achievement[i].description, ach_obj.achievement[i].hidden, ach_no, ach_obj.achievement[i].bonus);
            var bo=10+i*165;
            $("#pop" + ach_no).css("bottom",bo+"px");
            ach_no++;
        }
    }
}


$(function () {
    var word;
    var obj;
    var has_result = false;
    var has_word = false;

    var has_result_box_or_not = document.getElementById("GoCheer-main_box");
    if (!has_result_box_or_not) {
        $("body").append(text_result_box);
        var url_image3=chrome.runtime.getURL("images/枸杞水印.png");
        $(".GoCheer-logo").css("background-image","url("+url_image3+")");
        var url_image4=chrome.runtime.getURL("images/icon_close.png");
        $("#GoCheer-gb").css("background-image","url("+url_image4+")");
    }

    var b = document.getElementById("GoCheer_PopWrap");
    if (!b) {
        var p2 = document.createElement("div");
        p2.setAttribute("id", "GoCheer_PopWrap");
        document.body.appendChild(p2);
    }

    //给后台发请求问登录状态
    chrome.extension.sendRequest({"funct": "ask_for_loginstate"}, ask_for_loginstate);


    $("body").not("#GoCheer-main_box").unbind("click").bind("click", function getword(a) {
        //清除上次的划词结果
        word = null;
        obj = null;
        $("#ICIBA_HUAYI_input").text("");
        $(".GoCheer-group_pos").empty();


        var has_result_box_or_not = document.getElementById("GoCheer-main_box");
        if (!has_result_box_or_not) {
            $("body").append(text_result_box);
            var url_image3=chrome.runtime.getURL("images/枸杞水印.png");
            $(".GoCheer-logo").css("background-image","url("+url_image3+")");
        }

        var b = document.getElementById("GoCheer_PopWrap");
        if (!b) {
            var p2 = document.createElement("div");
            p2.setAttribute("id", "GoCheer_PopWrap");
            document.body.appendChild(p2);
        }

        //给后台发请求问登录状态
        chrome.extension.sendRequest({"funct": "ask_for_loginstate"}, ask_for_loginstate);

        if (has_result == false) {
            word = null;
            obj = null;
            // console.log("1");

            $("#GoCheer-main_box").unbind("click").bind("click", function (e) {
                e.stopPropagation();
            })
            $("#GoCheer-gb").unbind("click").bind("click", function (e) {
                $("#GoCheer-main_box").css("display", "none");
                e.stopPropagation();
            })
            if (log_state == true) {
                if (word = window.getSelection ? window.getSelection() : document.selection.createRange().text) {
                    has_word = true;
                    var mx = getMousePos(a).x;
                    var my = getMousePos(a).y;
                    var mx1=getMousePos1(a).x;
                    var my1 = getMousePos1(a).y;
                    if (word != "" && word != null) {
                        $("#GoCheer-main_box").css("display", "block");
                        $("#GoCheer-main_box").css("position", "absolute");
                        if (document.body.clientWidth - mx < 310) {
                            $("#GoCheer-main_box").css("left", (document.body.clientWidth - 310) + "px");
                        }
                        else {
                            $("#GoCheer-main_box").css("left", (mx + 10) + "px");
                        }
                        if (document.body.clientHeight - my < 200) {
                            var t=$("#GoCheer-main_box").offset().top;
                            $("#GoCheer-main_box").css("bottom", (document.body.clientHeight-my-window.scrollY) + "px");
                            $("#GoCheer-main_box").css("top","auto");
                        }
                        else {
                            var t=$("#GoCheer-main_box").offset().top;
                            $("#GoCheer-main_box").css("top", (my1) + "px");
                            $("#GoCheer-main_box").css("bottom","auto");
                        }
                        $("#GoCheer-main_box").css("z-index", "9999");
                        // $("#GoCheer-main_box").css("position", "absolute").css("left", (getMousePos(a).x + 10) + "px").css("top", (getMousePos(a).y + 10) + "px").css("z-index", "999");

                        has_result = true;
                        $.ajax({
                            type: "get",
                            url: "//fanyi.youdao.com/openapi.do?keyfrom=GoCheer&key=1831162149&type=data&doctype=json&version=1.1&q=" + word,
                            success: function (item) {
                                obj = eval(item);
                                var result = new Array();
                                $("#ICIBA_HUAYI_input").text(obj.query);
                                // console.log("query=" + obj.query);
//                         errorCode：
// 　                       0 - 正常
//                         20 - 要翻译的文本过长
//                         30 - 无法进行有效的翻译
//                         40 - 不支持的语言类型
//                         50 - 无效的key
//                         60 - 无词典结果，仅在获取词典结果生效
                                if (obj.basic != null && obj.errorCode == 0) { //有道词典-基本词典
                                    for (var i = 0; i < obj.basic.explains.length; i++) {
                                        result[i] = obj.basic.explains[i];
                                        var temp = document.createElement("p");
                                        temp.innerHTML = result[i];
                                        $(".GoCheer-group_pos").append(temp);
                                    }
                                }
                                else if (obj.translation != null && obj.errorCode == 0) { //有道翻译
                                    for (var i = 0; i < obj.translation.length; i++) {
                                        result[i] = obj.translation[i];
                                        var temp = document.createElement("p");
                                        temp.innerHTML = result[i];
                                        $(".GoCheer-group_pos").append(temp);
                                    }
                                }
                                else if (obj.errorCode == 20) {
                                    var temp = document.createElement("p");
                                    temp.innerHTML = "抱歉，您要翻译的文本过长。";
                                    $(".GoCheer-group_pos").append(temp);
                                }
                                else if (obj.errorCode == 30 || obj.errorCode == 40 || obj.errorCode == 50 || obj.errorCode == 60) {
                                    var temp = document.createElement("p");
                                    temp.innerHTML = "抱歉，我们无法进行有效的翻译。";
                                    $(".GoCheer-group_pos").append(temp);
                                }

                                chrome.extension.sendRequest({
                                    "funct": "ask_for_achievement",
                                    "word": obj.query
                                }, ask_for_achivement);

                            }
                        });
                    }
                }
            }
        }
        else if (has_word == true && has_result == true) {
            // console.log("2");
            $("#GoCheer-main_box").css("display", "none");
            $(".GoCheer-group_pos").empty();
            has_result = false;
            has_word = false;
        }
        else if (has_word == false && has_result == true) {
            console.log("3");
            $("#GoCheer-main_box").css("display", "none");
            $(".GoCheer-group_pos").empty();
            has_result = false;
            has_word = false;
        }
        else {
            console.log("5");
        }
    })

})

//获得划词时鼠标的位置
function getMousePos1(event) {

    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    return {'x': x, 'y': y};
}

function getMousePos(event) {
    var e = event || window.event;
    return {'x':e.clientX,'y':e.clientY}
}

// document.body.addEventListener("click", getWord, false);