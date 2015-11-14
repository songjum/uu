/**
 * Created by w on 2015/10/20.
 */
$(function(){
    //第一次调用加载更多显示默认信息
    loadMore();
    bindFun();
    var data = getData().data;
    function getData(){
        var data = {
            "cityId":getApi().CityId
        };
        return data;
    }
    function bindFun(){
        $(".load_more").click(function(){
            loadMore();
        })
    }
    function loadMore() {
        ajaxLP(data,eachLP);
    }
    function ajaxLP(data,callback){
        callback(price);
        //$.ajax({
        //    url:"",
        //    type:"get",
        //    dataType:"json",
        //    data:data,
        //    success:function(data){
        //        callback(data);
        //    }
        //})
    }
    function eachLP(data) {
        if (data == null && data.code == 0) {
            return false;
        }
        var i = $(".product").length, dataLength = data.Data.length;
        var lP = [];
        for(var m = 0; m < dataLength;m++){
            $(".main").append("<div class='product'> <img src='img/price.png' alt='特价' class='price'/><img src='img/car_small.jpg' alt='北京现代ix35' class='car_pic'/> <p class='h3'>北京现代 ix35 精英版</p> <p class='p_subtitle'>北京现代 ix35 精英版北京现代 ix35 ...</p> <b class='bc_b'>优惠3.5万</b> <p class='p_needfloat'>限量10台，已预订7台</p> <p class='p_last'>优优价：<b class='big_b'>13.69</b>万元</p> <input type='button'/> <div class='clear_fix'></div></div><div class='clear_fix'></div>")
        }
        $.each(data.Data, function (value, key) {
            console.log(i);
            lP[i] = $(".product").eq(i);
            lP[i].children(".h3").text(this.title);
            lP[i].children(".h3").next().text(this.subTitle.substr(0, 19) + "...");
            lP[i].children("b").text(this.discount);
            lP[i].children(".car_pic").attr({
                "src": this.picUrl,
                "onclick": "location.href='reservation.html?caiId=" + this.carId + "'"
            });
            lP[i].children(".p_last").children("b").text(this.price.substr(1, this.price.length - 2));
            lP[i].children(".p_needfloat").text("限量" + this.limit + "台,已预定" + this.signUpNum + "台");
            lP[i].children("input").attr("onclick", "location.href='reservation.html?caiId=" + this.carId + "'");
            lP[i].children(".h3").attr("onclick", "location.href='reservation.html?caiId=" + this.carId + "'");
            i++;
        });
    }

});
//var i = 0;
////限量特价
//function limitPrice(jsonText){
//    if(jsonText == null || jsonText.code == 0) {
//        return false;
//    }
//    var lP=[];
//    $.each(jsonText.Data, function (value, key) {
//        lP[i] = $(".product").eq(i);
//        lP[i].children(".h3").text(this.title);
//        lP[i].children(".h3").next().text(this.subTitle.substr(0,19)+"...");
//        lP[i].children("b").text(this.discount);
//        lP[i].children(".car_pic").attr({"src":this.picUrl,"onclick":"location.href='reservation.html?caiId="+this.carId+"'"});
//        lP[i].children(".p_last").children("b").text(this.price.substr(1,this.price.length-2));
//        lP[i].children(".p_needfloat").text("限量"+this.limit+"台,已预定"+this.signUpNum+"台");
//        lP[i].children("input").attr("onclick","location.href='reservation.html?caiId="+this.carId+"'");
//        lP[i].children(".h3").attr("onclick","location.href='reservation.html?caiId="+this.carId+"'");
//        i++;
//    });
//}
//
//function loadMore(url){
//    var a = $(".product").length;
//    loadMoreAnimate();
//    //$.ajax({
//    //    url:url,
//    //    type:"post",
//    //    datatype:"json",
//    //    Data:{
//    //        "cityId":$.cookie("cityId")
//    //    },
//    //    success: function (data) {
//    //        //clearInterval
//    //        // (loadMore());
//    //        var lengt = 0;
//    //            $.each(data,function(value,key){
//    //                lengt++;
//    //                if(lengt > a){
//    //                    $(".product").last().append("<div class='product'><img src='../img/price.png' alt='特价'/><img src='../img/car_small.jpg' alt='北京现代ix35'/> <p class='h3'>北京现代 ix35 精英版</p> <p>北京现代 ix35 精英版北京现代 ix35 ...</p> <b class='bc_b'>优惠3.5万</b> <p class='p_needfloat'>限量10台，已预订7台</p> <p class='p_last'>优优价：<b class='big_b'>13.69</b>万元</p> <input type='button'/> <div class='clear_fix'></div> </div>")
//    //                    $(".product").last().children(".h3").text(this.title);
//    //                    $(".product").last().children(".h3").next().text(this.subTitle.substr(0,19)+"...");
//    //                    $(".product").last().children("b").text(this.discount);
//    //                    $(".product").last().children(".car_pic").attr({"src":this.picUrl,"carId":this.carId});
//    //                    $(".product").last().children(".p_last").children("b").text(this.price.substr(1,5));
//    //                    $(".product").last().children(".p_needfloat").text("限量"+this.limit+"台,已预定"+this.signUpNum+"台");
//    //                }
//    //            })
//    //    },
//    //    error:function(){
//    //        return false;
//    //    }
//    //})
//}
////加载更多动画
//function loadMoreAnimate(){
//    (function  more(data) {
//        //clearInterval
//        // (loadMore());
//        var a = $(".product").length;
//        var dataLength = 0;
//        $.each(data.Data,function(value,key){
//            dataLength++;
//            if(dataLength >$(".product").length){
//                $(".main").append("<div class='product'><img src='img/price.png' alt='特价' class='price'/><img src='../img/car_small.jpg' class='car_pic'' alt='北京现代ix35'/> <p class='h3'>北京现代 ix35 精英版</p> <p>北京现代 ix35 精英版北京现代 ix35 ...</p> <b class='bc_b'>优惠3.5万</b> <p class='p_needfloat'>限量10台，已预订7台</p> <p class='p_last'>优优价：<b class='big_b'>13.69</b>万元</p> <input type='button'/> <div class='clear_fix'></div> </div><div class='clear_fix'></div>")
//                $(".product").last().children(".h3").text(this.title);
//                $(".product").last().children(".h3").next().text(this.subTitle.substr(0,19)+"...");
//                $(".product").last().children("b").text(this.discount);
//                $(".product").last().children(".car_pic").attr({"src":this.picUrl,"carId":this.carId});
//                $(".product").last().children(".p_last").children("b").text(this.price.substr(1,this.price.length-2));
//                $(".product").last().children(".p_needfloat").text("限量"+this.limit+"台,已预定"+this.signUpNum+"台");
//            }
//        })
//    })(price);
//    $(".load_more>img").css({"transform":"rotate(1080deg)","transition": "transform 5s ease 0s"});
//}
var price=            //限量特价json
{
    "Code"         : 1,
    "Data"         : [
        {
            "id"           : 1,
            "cityId"       : 239,
            "carId"        : 298,
            "title"        : "迈锐宝 2014款 2.0L 自动舒适版",
            "subTitle"     : "注：此价格全国最低价，还送导航，价格绝对优惠！",
            "tuanTime"     : "\/Date(1444206870250)\/",
            "price"        : "￥13.39万",
            "consultPrice" : "￥16.99万",
            "discount"     : "优惠3.6万",
            "limit"        : 10,
            "signUpNum"    : 7,
            "hot"          : 0,
            "carband"      : "通用雪佛兰",
            "countryType"  : "美系",
            "name"         : "迈锐宝",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144752848083562_pcb.jpg"
        },
        {
            "id"           : 2,
            "cityId"       : 239,
            "carId"        : 297,
            "title"        : "科鲁兹 2016款 1.4T DCG豪华版",
            "subTitle"     : "注：此价格全国最低价，还送导航，价格绝对优惠！",
            "tuanTime"     : "\/Date(1444206925417)\/",
            "price"        : "￥12.79万",
            "consultPrice" : "￥14.99万",
            "discount"     : "优惠2.2万",
            "limit"        : 10,
            "signUpNum"    : 5,
            "hot"          : 0,
            "carband"      : "通用雪佛兰",
            "countryType"  : "美系",
            "name"         : "科鲁兹",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144752617899135_pcb.jpg"
        },
        {
            "id"           : 3,
            "cityId"       : 239,
            "carId"        : 338,
            "title"        : "凯越 2015款 1.5L 自动经典款",
            "subTitle"     : "注：此价格全国最低价，还送导航，价格绝对优惠！",
            "tuanTime"     : "\/Date(1444207005990)\/",
            "price"        : "￥6.89万",
            "consultPrice" : "￥9.19万",
            "discount"     : "优惠2.3万",
            "limit"        : 15,
            "signUpNum"    : 11,
            "hot"          : 0,
            "carband"      : "通用别克",
            "countryType"  : "美系",
            "name"         : "凯越",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14143892981051502_pcb.jpg"
        }
    ]
};