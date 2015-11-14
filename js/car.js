/**
 * Created by w on 2015/10/25.
 */
$(function(){
    var mainData=
    {
        "Code": 1,
        "Data": {
            "id": 22,
            "cityId": 239,
            "carId": 78,
            "title": "【泉州】宝来大型汽车团购,泉州最低价,比车展更便宜",
            "tuanTime": "2015-10-24",
            "consultPrice": null,
            "price": "现场公布",
            "signUpNum": 312,
            "initNum": 254,
            "createTime": "\/Date(1427969335990)\/",
            "status": 1,
            "hot": 100,
            "carband": "一汽-大众",
            "countryType": "德系",
            "name": "宝来",
            "picUrl": "http://img.uumaiche.com/car/413_275/14144761612820_pcb.jpg"
        }
    };                                                            -
    //-----------------------------------------------------------
    //页面开始时请求数据
    ajaxMainData();
    //获取data
    var data =getData().data;
    //绑定事件
    (function(){
        $(".submit").click(function(){
            postData();
        })
    })();

    //取得cityid carid
    function getData(){
        var cityId = getApi().CityId,carId = getUrlParam("id");
        console.log(getApi().CityName);
        return data = {"cityId":cityId,"carId":carId};
    }
    //请求ajax
    function ajaxMainData(){
        ajaxMD(data,eachMainData);
    }
    //ajax请求数据
    function ajaxMD(data,callback){
        callback(mainData);
        //$.ajax({
        //    url:"",
        //    type:"get",
        //    data:data,
        //    success:function(data){
        //        callback(data);
        //    }
        //})
    }
    //提交数据并判断输入是否正确
    function postData(){
        var regPhone = /^1[3-9]\d{9}$/,str = $("input[name=tel]").val();
        if($("input[name=name]").val()==''){
            alert("请输入姓名。");
        }
        if(regPhone.test(str) == false){
            alert("请输入正确的电话号码");
        }else{
            ajaxPost(data);
        }
    }
    //method of post
    function ajaxPost(data){
        $.ajax({
            url:"",
            type:"post",
            data:data,
            success:function(data){
                alert("恭喜您，报名成功。团长会尽快与您联系");
                window.location.href='success.html';
            },
            error:function(){
                return 0;
            }
        })
    }
    //渲染数据 绘制网页
    function eachMainData(data){
        var that = data.Data;
        $(".product_banner").css("background-image","url("+that.picUrl+")");
        $(".product_banner>div>p").html(that.title);
        $(".reward>.application>b").html(that.signUpNum);
        $(".b").html(that.subTitle);
        $(".introduce>.p_a").eq(0).html("<b>团购时间 </b>: "+that.tuanTime);
        $(".introduce>.p_a").eq(1).html("<b>团购地点 </b>: "+$(".address>a").html()+"正规4S店<b class='b_notice'>（报名后通知）</b>")
        $(".introduce>.p_a").eq(2).html("<b>团购价格 </b>: "+that.price);
    }

});