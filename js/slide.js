/**
 * Created by w on 2015/10/18.
 */
$(function() {
    touch();
    var intb_X = setInterval(slideBottomBanner,3200);
});
function touch(){
    var intX= setInterval(slideTopBanner,3200);
    var startX = 0;//设置touch开始坐标点
    var width = window.innerWidth;
    function touchStart(evt) {
        try
        {
            //evt.preventDefault(); //阻止页面滑动
            var touch = evt.touches[0]; //获取第一个坐标点
            var x = Number(touch.pageX); //页面触点x坐标
            //记录触点x初始位置
            startX = x;
            window.clearInterval(intX);
        }
        catch (e) {
            console.log('touchStart' + e.message);
        }
        //clearInterval(slideBanner(),intX);
    }
    function touchMove(evt){
        try
        {
            var touch = evt.touches[0]; //获取第一个坐标点
            var x = Number(touch.pageX); //页面触点x坐标
            if (x - startX <= ((-width)/3) && x - startX >-width){
                if($(".slide").length != 0){
                    slideLeft();
                }
                if($(".top_banner").length != 0){
                    slideTopBanner();
                }
            }
            if (x - startX >= (width/3) && x - startX < width){
                if($(".slide").length != 0){
                    slideRight();
                }
                if($(".top_banner").length != 0){
                    slideTopBanner();
                }
            }
        }
        catch (e) {
            console.log('touchMove' + e.message);
        }
    }
    function touchEnd(evt){
        intX = setInterval(slideTopBanner,3200);
    }
    function bindEvent() {//touch事件绑定
        if($(".slide").length != 0){
            document.getElementById("slide").addEventListener('touchstart', touchStart, false);
            document.getElementById("slide").addEventListener('touchmove', touchMove, false);
        }
        if($(".top_banner").length != 0){
            document.getElementById("top_banner").addEventListener('touchstart', touchStart, false);
            document.getElementById("top_banner").addEventListener('touchmove', touchMove, false);
            document.getElementById("top_banner").addEventListener('touchend', touchEnd, false);
        }

    }
    bindEvent();
    $(".gr_buy_flow").click(slideLeft);
    $(".gr_buy_introduce").click(slideRight);
    //remove(touch时不能上下滑动)
    var xx,yy,XX,YY,swipeX,swipeY ;
    document.addEventListener('touchstart',function(event){
        xx = event.targetTouches[0].screenX ;
        yy = event.targetTouches[0].screenY ;
        swipeX = true;
        swipeY = true;
    });
    document.addEventListener('touchmove',function(event){
        XX = event.targetTouches[0].screenX ;
        YY = event.targetTouches[0].screenY ;
        if(swipeX && Math.abs(XX-xx)-Math.abs(YY-yy)>0)  //左右滑动
        {
            event.stopPropagation();//组织冒泡
            event.preventDefault();//阻止浏览器默认事件
            swipeY = false ;
            //左右滑动
        }
        else if(swipeY && Math.abs(XX-xx)-Math.abs(YY-yy)<0){  //上下滑动
            swipeX = false ;
            //上下滑动，使用浏览器默认的上下滑动
        }

    });
}
function slideLeft(){
    $(".slide").stop(true).animate({// stop函数清除动画队列，
        marginLeft:"-40rem"
    },200);
    $(".gr_buy_introduce").children("img").stop(true).animate({
        marginLeft:"25.73rem"
    },150);
    $(".gr_buy_introduce").children("p").attr("class",null);
    $(".gr_buy_flow").children("p").attr("class",'color');
}
function slideRight(){
    $(".slide").stop(true).animate({
        marginLeft:"0"
    },200);
    $(".gr_buy_introduce").children("img").stop(true).animate({
        marginLeft:"5.73rem"
    },150);
    $(".gr_buy_introduce").children("p").attr("class",'color');
    $(".gr_buy_flow").children("p").attr("class",null);
}
function slideTopBanner(){
    if($(".banner").css("margin-left")=="0px"){
        $(".banner").stop().animate({
            marginLeft: -window.innerWidth+"px"
        }, 200,function(){
            $(".bg").attr("class",'').siblings().attr("class",'bg');
        });
    }
    if($(".banner").css("margin-left")==-window.innerWidth+"px"){
        $(".banner").stop().animate({
            marginLeft: "0px"
        }, 200,function(){
            $(".bg").attr("class",'').siblings().attr("class",'bg');
        });
    }
}
//function slideLeftBanner(callback){
//    if(j < -2){
//        $(".banner").css("margin-left",'0');
//        j = -1;
//    }
//    $(".banner").stop().animate({
//        marginLeft: window.innerWidth*j+"px"
//    }, 200,function(){
//        $(".bg").attr("class",'').siblings().attr("class",'bg');
//    });
//    console.log(j);
//    callback;
//    j--;
//}
//function setBanner(){
//    if($(".banner").css("margin-left") == -(window.innerWidth*2)){
//        $(".banner").css("margin-left",'0');
//    }
//}
//function slideRightBanner(){
//    if(n < 3){
//        n = 1;
//    }
//    $(".banner").stop().animate({
//        marginLeft: (window.innerWidth+$(".banner").css("margin-left"))+"px"
//    }, 200,function(){
//        $(".bg").attr("class",'').siblings().attr("class",'bg');
//    });
//    n--;
//}
var i = -1,j=-1,n = 1;
function slideBottomBanner() {
    //if(i < -2){
    //    $(".b_banner").css("margin-left",'0');
    //    i = -1;
    //}
    if($(".b_banner").css("margin-left")=="0px"){
        $(".b_banner").stop().animate({
            marginLeft: window.innerWidth*i+"px"
        }, 200);
    }
    if($(".b_banner").css("margin-left")== -window.innerWidth+"px"){
        $(".b_banner").stop().animate({
            marginLeft: "0px"
        }, 200);
    }
    //console.log(i);
    //i--;

}