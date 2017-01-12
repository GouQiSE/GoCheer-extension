/**
 * Created by ZHY on 2016/12/18.
 */
//pop右下角弹窗函数

function Pop(name, intro, state, no,bonus) {
    this.name = name;
    this.intro = intro;
    this.state = state;
    this.no = no;
    this.bonus=bonus;
    this.apearTime = 500;
    this.hideTime = 500;
    this.delay = 30000;
    //添加信息
    this.addInfo();
    //显示
    this.showDiv(this.apearTime,this.hideTime,this.delay,this.no);
    //关闭
    this.closeDiv(this.no,this.hideTime);
}

Pop.prototype = {
    addInfo: function () {
        $("#" + "pop" + this.no).find("#popAchName").html(this.name);
        $("#" + "pop" + this.no).find("#popIntro").html(this.intro);
        // $("#" + "pop" + this.no).find("#popState").html(this.state);
        $("#" + "pop" + this.no).find("#popBonus").append(this.bonus);
        if (this.state==true){
            $("#" + "pop" + this.no).find("#popAchName").append("【Hidden】");
        }

    },
    showDiv: function (at,ht,dl,n) {
        $("#" + "pop" + n).slideDown(at).delay(dl).slideUp(ht);
        // $("#" + "pop" + n).mouseover(function () {
        //     $("#" + "pop" + n).delay(30000);
        // });
        // $("#" + "pop" + n).mouseout(function () {
        //     $("#" + "pop" + n).delay(1000).slideUp(ht);
        // });
        // $("#" + "pop" + n).slideUp(ht);
    },
    closeDiv: function (n,ht) {
        $("#" + "pop" + n).find("#popClose").unbind("click").click(function () {
            // $("#" + "pop" + n).css("display","none");
            $("#" + "pop" + n).stop(true, true).slideToggle(ht);
        });
    }
}


