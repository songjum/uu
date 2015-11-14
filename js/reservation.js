/**
 * Created by w on 2015/10/20.
 */
// 8. 限量特价预定
$(function(){
    function reservation(jsonText) {
        var that = jsonText.Data;
        $(".product_banner").children("div").children("p").html(that.title);
        $(".product_banner").css("background-image", "url('" + that.picUrl + "')");
        $(".reward").children(".help").children("b").text(that.price.substring(1,6));
        $(".reward>.bgc").eq(0).text(that.discount);
        $(".sp_b").text(that.consultPrice.substring(1,7));
        $(".reward>.bgc>b").eq(0).text(that.limit);
        $(".reward>.bgc>b").eq(1).text(that.signUpNum);
        $(".b").text(that.subTitle);
    }
    $(function(){
        reservation(re);
        $(".submit").click(function () {
            iWant("/Special/Add");
        });
    });

    function iWant(url) {
        if($("input[name=name]").val()==''){
            alert("请输入姓名。");
            return false;
        }
        if(regPhone.test(str) == false){
            alert("请输入正确的电话号码");
            return false;
        }
        else{
            $.ajax ({
                url: url,
                method: "post",
                userId: "2",
                Data:{
                    "cityId": $.cookie("cityId"),
                    "carId":  getUrlParam("carId"),
                    "tel": $("input[name=tel]").val(),
                    "name": $("input[name='name']").val()
                },
                success: function (data) {
                    alert("报名成功")
                },
                error: function (e) {
                    alert(e.massage)
                }
            });
        }
    }
    var re =
    {
        "Code"         : 1,
        "Data"         : {
            "id"           : 9,
            "cityId"       : 239,
            "carId"        : 78,
            "title"        : "宝来 2015款 质惠版 1.6L 自动舒适型",
            "subTitle"     : "注：此价格全国最低价，还送导航，价格绝对优惠！",
            "tuanTime"     : "\/Date(1444207798387)\/",
            "price"        : "￥10.93万",
            "consultPrice" : "￥12.53万",
            "discount"     : "优惠1.6万",
            "limit"        : 13,
            "signUpNum"    : 17,
            "hot"          : 0,
            "carband"      : "一汽-大众",
            "countryType"  : "德系",
            "name"         : "宝来",
            "picUrl"       : "http://img.uumaiche.com/car/413_275/14144761612820_pcb.jpg"
        }
    }
});