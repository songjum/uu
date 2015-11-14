/**
 * Created by w on 2015/10/19.
 */
$(function(){
    ad(ad_);
    hotBuyingGroup(hotBG);
    limitPrice(price);
    hotBrand(logo);

});
// 1.广告
function ad(jsonText){
    var i = 0;
    if(jsonText == null || jsonText.code == 0){
        return false;
    }
    $.each(jsonText.Data,function(value,key){
        $(".banner>a").eq(i).children("img").attr({"src":this.picUrl,"alt":this.title});
        $(".banner>a").eq(i).attr("href",this.url);
        i++;
    });
    //$(".banner").append("<a href='"+$(".banner>a").eq(0).attr("href")+"'><img class='third_banner' src='"+$(".banner>a").eq(0).children("img").attr("src")+"' alt='"+$(".banner>a").eq(0).children("img").attr("src")+"'/></a>");
}
// 2.限量特价
function limitPrice(jsonText){
    var i = 0;
    if(jsonText == null || jsonText.code == 0){
        return false;
    }
    var lP=[];
    $.each(jsonText.Data, function (value, key) {
        $(".article").eq(0).append("<div class='product'> <img src='img/price.png' alt='特价' class='price'/> <img src='../img/car_small.jpg' alt='北京现代ix35' class='car_pic'/> <p class='h3' onclick='location.href='limited.html''>北京现代 ix35 精英版</p> <p class='p_subtitle'>北京现代 ix35 精英版...</p> <b class='bc_b'>优惠3.5万</b> <p class='p_needfloat'>限量10台，已预订7台</p> <p class='p_last'>优优价：<b class='big_b'>13.69</b>万元</p> <input type='button'/> </div><div class='clear_fix'></div>")
        lP[i] = $(".article>.product").eq(i);
        lP[i].children(".h3").attr("onclick","location.href='reservation.html?carId="+this.carId+"'").html(this.title);
        lP[i].children(".h3").next().html(this.subTitle.substr(0,18)+"...");
        lP[i].children("b").html(this.discount);
        lP[i].children("img").eq(1).attr({"src":this.picUrl,"onclick":"location.href='reservation.html?carId="+this.carId+"'"});
        lP[i].children("a").attr("href",'reservation.html?carId='+this.carId);
        lP[i].children(".p_last").children("b").html(this.price.substr(1,5));
        lP[i].children(".p_needfloat").html("限量"+this.limit+"台,已预定"+this.signUpNum+"台");
        lP[i].children("input").attr("onclick","location.href='reservation.html?carId="+this.carId+"'");
        i++;
    });
    $(".article>.product").eq(0).css("border-top",'none');

}
// 3.热门品牌
function hotBrand(jsonText) {
    var i = 0;
    if(jsonText == null || jsonText.code == 0){
        return false;
    }
    $.each(jsonText.Data, function (value, key) {
        $(".car_logo").eq(i).children("img").attr({"src":this.picUrl,"alt":this.carBand});
        $(".car_logo").eq(i).attr("href","buying.html?id="+this.id);
        i++;
    });
}
// 4.热门团购
function hotBuyingGroup(jsonText){
    if(jsonText == null || jsonText.code == 0){
        return false;
    }
    var lP = [];
    var i = 0;
    for(var a = 0;a < (jsonText.Data.length-4)/2;a++){
        $(".article").eq(2).append("<div class='buying_group'> <div class='group'><p>团购</p></div> <img /> <p></p> <p>已有<b></b>人报名</p></div><div class='buying_group group_right'> <div class='group'><p>团购</p></div><img/> <p>宝来团购</p> <p>已有<b>161</b>人报名</p> </div>")
    }
    $.each(jsonText.Data,function(value,key){
        lP[i] = $(".buying_group").eq(i);
        lP[i].attr("onclick","location.href='car.html?carId="+this.carId+"'");
        lP[i].children("img").attr("src",this.picUrl);
        lP[i].children("p").eq(0).text(this.name+"团购");
        lP[i].children("p").eq(1).children("b").text(this.signUpNum);
        i++;
    })
}
// 5.没有

var ad_ =              //广告测试json
{
    "Code": 1,
    "Data": [{
        "id": 3,
        "picUrl": "http://img.uumaiche.com/topic/junyue_380_180.jpg",
        "url": "http://www.uumaiche.com/tuan/b46",
        "title": "君越汽车团购"
    }, {
        "id": 4,
        "picUrl": "http://img.uumaiche.com/topic/baolai_380_180.jpg",
        "url": "http://www.uumaiche.com/tuan/c78",
        "title": "宝来汽车团购"
    }]
};
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
var logo =             //logo  json
{
    "Code"    : 1,
    "Data"    : [
        {
            "id"      : 1,
            "carBand" : "上海大众",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071141466531076_s.jpg"
        },
        {
            "id"      : 2,
            "carBand" : "一汽奥迪",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14331625647222867_s.jpg"
        },
        {
            "id"      : 4,
            "carBand" : "宝马",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071202813792250_s.jpg"
        },
        {
            "id"      : 5,
            "carBand" : "北京奔驰",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071202350352937_s.jpg"
        },
        {
            "id"      : 8,
            "carBand" : "一汽-大众",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071140956585687_s.jpg"
        },
        {
            "id"      : 9,
            "carBand" : "北京现代",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071217754717364_s.jpg"
        },
        {
            "id"      : 16,
            "carBand" : "一汽马自达",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14331629915983949_s.jpg"
        },
        {
            "id"      : 22,
            "carBand" : "一汽丰田",
            "picUrl"  : "http://img.uumaiche.com/car/logo/yqftlogo.jpg"
        },
        {
            "id"      : 40,
            "carBand" : "通用雪佛兰",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071216452737768_s.jpg"
        },
        {
            "id"      : 41,
            "carBand" : "长安福特",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14071217458303546_s.jpg"
        },
        {
            "id"      : 46,
            "carBand" : "通用别克",
            "picUrl"  : "http://img.uumaiche.com/car/logo/14074697832287231_s.jpg"
        },
        {
            "id"      : 49,
            "carBand" : "东风标致",
            "picUrl"  : "http://img.uumaiche.com/car/logo/dfbzlogo.jpg"
        }
    ]
};
var hotBG=             //热门团购
{
    "Code"         : 1,
    "Data"         : [
        {
            "id"           : 22,
            "cityId"       : 239,
            "carId"        : 78,
            "title"        : "【泉州】宝来大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 297,
            "initNum"      : 254,
            "createTime"   : "\/Date(1427969335990)\/",
            "status"       : 1,
            "hot"          : 100,
            "carband"      : "一汽-大众",
            "countryType"  : "德系",
            "name"         : "宝来",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144761612820_pcb.jpg"
        },
        {
            "id"           : 21,
            "cityId"       : 239,
            "carId"        : 77,
            "title"        : "【泉州】捷达大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 264,
            "initNum"      : 244,
            "createTime"   : "\/Date(1427969316210)\/",
            "status"       : 1,
            "hot"          : 88,
            "carband"      : "一汽-大众",
            "countryType"  : "德系",
            "name"         : "捷达",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/1414476301614550_pcb.jpg"
        },
        {
            "id"           : 19,
            "cityId"       : 239,
            "carId"        : 75,
            "title"        : "【泉州】速腾大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 364,
            "initNum"      : 237,
            "createTime"   : "\/Date(1427969275693)\/",
            "status"       : 1,
            "hot"          : 87,
            "carband"      : "一汽-大众",
            "countryType"  : "德系",
            "name"         : "速腾",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144765602376409_pcb.jpg"
        },
        {
            "id"           : 55,
            "cityId"       : 239,
            "carId"        : 308,
            "title"        : "【泉州】福克斯大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 229,
            "initNum"      : 238,
            "createTime"   : "\/Date(1427970183983)\/",
            "status"       : 1,
            "hot"          : 85,
            "carband"      : "长安福特",
            "countryType"  : "美系",
            "name"         : "福克斯",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144029809989554_pcb.jpg"
        },
        {
            "id"           : 56,
            "cityId"       : 239,
            "carId"        : 309,
            "title"        : "【泉州】蒙迪欧大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 173,
            "initNum"      : 232,
            "createTime"   : "\/Date(1427970204613)\/",
            "status"       : 1,
            "hot"          : 84,
            "carband"      : "长安福特",
            "countryType"  : "美系",
            "name"         : "蒙迪欧",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/1414403005771929_pcb.jpg"
        },
        {
            "id"           : 78,
            "cityId"       : 239,
            "carId"        : 368,
            "title"        : "【泉州】标致308大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 151,
            "initNum"      : 220,
            "createTime"   : "\/Date(1427970830107)\/",
            "status"       : 1,
            "hot"          : 80,
            "carband"      : "东风标致",
            "countryType"  : "欧系",
            "name"         : "标致308",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144024009484177_pcb.jpg"
        },
        {
            "id"           : 76,
            "cityId"       : 239,
            "carId"        : 366,
            "title"        : "【泉州】标致408大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 261,
            "initNum"      : 231,
            "createTime"   : "\/Date(1427970792643)\/",
            "status"       : 1,
            "hot"          : 78,
            "carband"      : "东风标致",
            "countryType"  : "欧系",
            "name"         : "标致408",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14152608821017321_pcb.jpg"
        },
        {
            "id"           : 27,
            "cityId"       : 239,
            "carId"        : 83,
            "title"        : "【泉州】瑞纳大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 93,
            "initNum"      : 196,
            "createTime"   : "\/Date(1427969564650)\/",
            "status"       : 1,
            "hot"          : 76,
            "carband"      : "北京现代",
            "countryType"  : "日韩系",
            "name"         : "瑞纳",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144016436953272_pcb.jpg"
        },
        {
            "id"           : 26,
            "cityId"       : 239,
            "carId"        : 402,
            "title"        : "【泉州】索纳塔九大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 97,
            "initNum"      : 207,
            "createTime"   : "\/Date(1427969525233)\/",
            "status"       : 1,
            "hot"          : 75,
            "carband"      : "北京现代",
            "countryType"  : "日韩系",
            "name"         : "索纳塔九",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14147181803361134_pcb.jpg"
        },
        {
            "id"           : 30,
            "cityId"       : 239,
            "carId"        : 86,
            "title"        : "【泉州】名图大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime"     : "2015/10/17",
            "consultPrice" : null,
            "price"        : "现场公布",
            "signUpNum"    : 106,
            "initNum"      : 200,
            "createTime"   : "\/Date(1427969627620)\/",
            "status"       : 1,
            "hot"          : 70,
            "carband"      : "北京现代",
            "countryType"  : "日韩系",
            "name"         : "名图",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144016316809754_pcb.jpg"
        }
    ]
}