/**
 * Created by w on 2015/10/20.
 */
$(function(){
    cityData(city);//回调函数
    $(".wrap_left>.corect>a").click(function(){
        var cityId = $(this).attr("data-cityId");
        var cityName = $(this).html().substr(0,$(this).html().length-1);
        setCookie(cityId,cityName);
        history.back(-1);
    });
    $("header>h3>span").html($.cookie("cityName"));
    $(".location_city>a").html($.cookie("cityName"));
});
// 6.城市列表
function cityData(jsonText){
    if(jsonText == null || jsonText.code == 0){
        return false;
    }
    var i = 0,j = 0,lP = [];
    $.each(jsonText.Data, function (value,key) {
        lP[i] = $(".nav").eq(i);
        $.each(jsonText.Data[i].cityData,function(value,key){
            lP[j].next(".recent").children("a").text(this.cityName);
            lP[j].next(".recent").children("a").attr({"data-domainName":this.domainName,"data-cityId":this.id,"href":"javascript:void(0)"});
            j++;
        });
        i++;
    });

}

function setCookie(cityId,cityName) {
    $.cookie("cityId", cityId);
    $.cookie("cityName", cityName);
}
var city=
{
    "Code"       : 1,
    "Data"       : [
        {
            "pinYin"     : "F",
            "cityData"   : [
                {
                    "id"         : 77,
                    "domainName" : "fz",
                    "cityName"   : "福州市"
                }
            ]
        },
        {
            "pinYin"     : "H",
            "cityData"   : [
                {
                    "id"         : 118,
                    "domainName" : "hhht",
                    "cityName"   : "呼和浩特市"
                }
            ]
        },
        {
            "pinYin"     : "L",
            "cityData"   : [
                {
                    "id"         : 187,
                    "domainName" : "ly",
                    "cityName"   : "龙岩市"
                }
            ]
        },
        {
            "pinYin"     : "N",
            "cityData"   : [
                {
                    "id"         : 213,
                    "domainName" : "nd",
                    "cityName"   : "宁德市"
                }
            ]
        },
        {
            "pinYin"     : "P",
            "cityData"   : [
                {
                    "id"         : 222,
                    "domainName" : "pt",
                    "cityName"   : "莆田市"
                }
            ]
        },
        {
            "pinYin"     : "Q",
            "cityData"   : [
                {
                    "id"         : 239,
                    "domainName" : "qz",
                    "cityName"   : "泉州市"
                }
            ]
        },
        {
            "pinYin"     : "S",
            "cityData"   : [
                {
                    "id"         : 243,
                    "domainName" : "sm",
                    "cityName"   : "三明市"
                }
            ]
        },
        {
            "pinYin"     : "X",
            "cityData"   : [
                {
                    "id"         : 322,
                    "domainName" : "xm",
                    "cityName"   : "厦门市"
                }
            ]
        }
    ]
};