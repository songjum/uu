/**
 * Created by w on 2015/10/20.
 */
$(function(){
    //事件监听
    function bindEvent(){
        //动画
        $(".choose").click(function () {
            carBandAnimate();
        });
        $(".main>.hot_band>.article>a").click(function () {
            closeCarBandAnimate();
            $(".choose").attr("data-id",$(this).attr("data-id")).html($(this).html());
            chooseCB(ajaxCar);
        });
            $(".main>.car_band>a").click(function () {
                closeCarBandAnimate();
                alert(1);
                $(".choose").attr("data-id",$(this).attr("data-id")).html($(this).html());
                chooseCB(ajaxCar);
            });
        $(".choose_carband>.head>img").click(function () {
            closeCarBandAnimate();
        });
        $(".car>select").change(function(){
            ajaxMainData();
        });

        $(".submit").click(function(){
            var regPhone = /^1[3-9]\d{9}$/,str = $("input[name=tel]").val();
            if($(".choose").attr("data-id")==null){
                alert("请选择汽车品牌。");
                return false;
            }
            if($(".car>select").find("option:selected").val()==''){
                alert("请选择车型。");
                return false;
            }
            if($("input[name=name]").val()==''){
                alert("请输入姓名。");
                return false;
            }
            if(regPhone.test(str) == false){
                alert("请输入正确的电话号码");
                return false;
            }
            var postData = {
                carId : $("select>option:selected").val(),
                tel: $("input[name=tel]").val(),
                name: $("input[name=name]").val(),
                userId:2,
                cityId:getApi().CityId
            };
            $.ajax({
                type: 'get',
                data: postData,
                url: "",
                success: function(data) {
                    alert('已报名成功，团长会尽快与您联系！');
                    window.location.href = 'index.html';
                }
            });

        })
    }

    //请求mainData
    function ajaxMainData(){
        ajaxMain(drawMain);
    }
    function ajaxMain(callback){
        callback(main);
        //var mainData=
        //{
        //    cityId:id,
        //    carId:$(".car>select").find("option:selected").val()
        //};
        //$.ajax({
        //    url: "./Ajax/Data.ashx?action=specialbycarid",
        //    type: "get",
        //    dataType: "json",
        //    data: mainData,
        //    success: function (data) {
        //        callback(data);
        //    }
        //})

    }
    function drawMain(data){
        $.each(data.Data,function(value,key){
            var that = data.Data;
            $(".product_banner>div>p").html(that.title);
            $(".product_banner").css("background-image", "url('" + that.picUrl + "')");
            $(".reward>.application>b").text(that.signUpNum);
            $(".b").text(that.subTitle);
            $(".introduce>.p_a").eq(0).html("<b>团购时间 </b>: "+that.tuanTime);
            $(".introduce>.p_a").eq(1).html("<b>团购地点 </b>: "+ $.cookie("cityName")+"正规4S店<b class='b_notice'>（报名后通知）</b>")
            $(".introduce>.p_a").eq(2).html("<b>团购价格 </b>: "+that.price);
        })
    }
    //设置默认品牌
    function setCarBand(id,data,callback){
        for(var i = 0;i < data.length;i++){
            for(var j = 0;j < data[i].carBand.length;j++){
                if(id == data[i].carBand[j].id){
                    $(".choose").attr("data-id",data[i].carBand[j].id).html(data[i].carBand[j].carBand);
                    callback();
                    return 0;
                }
            }
        }
    }
    function chooseCB(callback){
        //监听点击事件
        callback();
    }
    function ajaxCarBand(){
        //carBandUrl
        ajaxCB(eachCarBand);

    }
    function ajaxCar(){
        var bandId = $(".choose").attr("data-id");
        //carUrl
        ajaxC(bandId,eachCar);
    }
    var id = getUrlParam("id");
    //遍历carBand 绘制网页
    function eachCarBand(data){
        if(data == null || data.code == 0){
            return false;
        }
        for(var i = 0;i < data.Data.length;i++){
            for(var j = 0;j < data.Data[i].carBand.length;j++){
                $(".car_band").eq(i).append("<a href='javascript:void(0)' data-id='"+data.Data[i].carBand[j].id+"'>"+data.Data[i].carBand[j].carBand+"</a>");
            }
        }
        bindEvent();
        if(!!id){
            setCarBand(id,data.Data,ajaxCar);
            id = null;
        }

    }

    //遍历car 并绘制网页
    function eachCar(data){
        $(".car>select>option").remove();
        $(".car>select").append("<option value=''>请选择车型</option>");
        $.each(data.Data,function(value,key){
            $(".car>select").append("<option value='"+this.id+"'>"+this.name+"</option>")
        });
    }

    //ajax carBand
    function ajaxCB(callback) {
        ////var th = carB;
        callback(carB);
        //$.ajax({
        //    url: "./Ajax/Data.ashx?action=carbandlist",
        //    type: "get",
        //    dataType: "json",
        //    success: function (data) {
        //        callback(data);
        //    }
        //})
    }

    //ajax car
    function ajaxC(data, callback) {
        callback(bandId);
        //$.ajax({
        //    url: "./Ajax/Data.ashx?action=carbybandid",
        //    type: "get",
        //    dataType: "json",
        //    data: {
        //        data: data
        //    },
        //    success: function (data) {
        //        callback(data);
        //    }
        //})
    }

    function carBandAnimate(){
        $(".choose_carband").css("display",'block');
    }
    function closeCarBandAnimate(){
        $(".choose_carband").css("display",'none');
    }

    var main=
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
    };
    var carB=    //测试数据
    {
        "Code"    : 1,
        "Data"    : [
            {
                "pinYin"  : "B",
                "carBand" : [
                    {
                        "id"      : 4,
                        "carBand" : "宝马"
                    },
                    {
                        "id"      : 5,
                        "carBand" : "北京奔驰"
                    },
                    {
                        "id"      : 9,
                        "carBand" : "北京现代"
                    },
                    {
                        "id"      : 26,
                        "carBand" : "北京汽车"
                    },
                    {
                        "id"      : 31,
                        "carBand" : "一汽奔腾"
                    },
                    {
                        "id"      : 33,
                        "carBand" : "比亚迪"
                    }
                ]
            },
            {
                "pinYin"  : "C",
                "carBand" : [
                    {
                        "id"      : 15,
                        "carBand" : "长安铃木"
                    },
                    {
                        "id"      : 18,
                        "carBand" : "长安马自达"
                    },
                    {
                        "id"      : 23,
                        "carBand" : "昌河铃木"
                    },
                    {
                        "id"      : 29,
                        "carBand" : "长城汽车"
                    },
                    {
                        "id"      : 34,
                        "carBand" : "长安汽车"
                    },
                    {
                        "id"      : 41,
                        "carBand" : "长安福特"
                    }
                ]
            },
            {
                "pinYin"  : "D",
                "carBand" : [
                    {
                        "id"      : 11,
                        "carBand" : "东风日产"
                    },
                    {
                        "id"      : 14,
                        "carBand" : "东风悦达起亚"
                    },
                    {
                        "id"      : 19,
                        "carBand" : "东风本田"
                    },
                    {
                        "id"      : 27,
                        "carBand" : "东南汽车"
                    },
                    {
                        "id"      : 36,
                        "carBand" : "东风启辰"
                    },
                    {
                        "id"      : 42,
                        "carBand" : "道奇"
                    },
                    {
                        "id"      : 47,
                        "carBand" : "东风雪铁龙"
                    },
                    {
                        "id"      : 49,
                        "carBand" : "东风标致"
                    }
                ]
            },
            {
                "pinYin"  : "F",
                "carBand" : [
                    {
                        "id"      : 53,
                        "carBand" : "菲亚特"
                    }
                ]
            },
            {
                "pinYin"  : "G",
                "carBand" : [
                    {
                        "id"      : 10,
                        "carBand" : "广汽丰田"
                    },
                    {
                        "id"      : 13,
                        "carBand" : "广汽三菱"
                    },
                    {
                        "id"      : 17,
                        "carBand" : "广汽本田"
                    },
                    {
                        "id"      : 37,
                        "carBand" : "广汽传祺"
                    },
                    {
                        "id"      : 39,
                        "carBand" : "观致"
                    }
                ]
            },
            {
                "pinYin"  : "H",
                "carBand" : [
                    {
                        "id"      : 38,
                        "carBand" : "红旗"
                    }
                ]
            },
            {
                "pinYin"  : "J",
                "carBand" : [
                    {
                        "id"      : 43,
                        "carBand" : "Jeep"
                    },
                    {
                        "id"      : 52,
                        "carBand" : "捷豹"
                    }
                ]
            },
            {
                "pinYin"  : "K",
                "carBand" : [
                    {
                        "id"      : 44,
                        "carBand" : "克莱斯勒"
                    },
                    {
                        "id"      : 45,
                        "carBand" : "凯迪拉克"
                    }
                ]
            },
            {
                "pinYin"  : "L",
                "carBand" : [
                    {
                        "id"      : 20,
                        "carBand" : "雷克萨斯"
                    },
                    {
                        "id"      : 48,
                        "carBand" : "雷诺"
                    },
                    {
                        "id"      : 51,
                        "carBand" : "路虎"
                    }
                ]
            },
            {
                "pinYin"  : "M",
                "carBand" : [
                    {
                        "id"      : 7,
                        "carBand" : "MINI"
                    }
                ]
            },
            {
                "pinYin"  : "N",
                "carBand" : [
                    {
                        "id"      : 32,
                        "carBand" : "纳智捷"
                    }
                ]
            },
            {
                "pinYin"  : "O",
                "carBand" : [
                    {
                        "id"      : 24,
                        "carBand" : "讴歌"
                    }
                ]
            },
            {
                "pinYin"  : "Q",
                "carBand" : [
                    {
                        "id"      : 21,
                        "carBand" : "起亚（进口）"
                    },
                    {
                        "id"      : 30,
                        "carBand" : "奇瑞"
                    }
                ]
            },
            {
                "pinYin"  : "S",
                "carBand" : [
                    {
                        "id"      : 1,
                        "carBand" : "上海大众"
                    },
                    {
                        "id"      : 3,
                        "carBand" : "斯柯达"
                    },
                    {
                        "id"      : 6,
                        "carBand" : "smart"
                    },
                    {
                        "id"      : 12,
                        "carBand" : "斯巴鲁"
                    },
                    {
                        "id"      : 35,
                        "carBand" : "上汽荣威"
                    }
                ]
            },
            {
                "pinYin"  : "T",
                "carBand" : [
                    {
                        "id"      : 40,
                        "carBand" : "通用雪佛兰"
                    },
                    {
                        "id"      : 46,
                        "carBand" : "通用别克"
                    }
                ]
            },
            {
                "pinYin"  : "W",
                "carBand" : [
                    {
                        "id"      : 28,
                        "carBand" : "五菱"
                    },
                    {
                        "id"      : 50,
                        "carBand" : "沃尔沃"
                    }
                ]
            },
            {
                "pinYin"  : "Y",
                "carBand" : [
                    {
                        "id"      : 2,
                        "carBand" : "一汽奥迪"
                    },
                    {
                        "id"      : 8,
                        "carBand" : "一汽-大众"
                    },
                    {
                        "id"      : 16,
                        "carBand" : "一汽马自达"
                    },
                    {
                        "id"      : 22,
                        "carBand" : "一汽丰田"
                    }
                ]
            },
            {
                "pinYin"  : "Z",
                "carBand" : [
                    {
                        "id"      : 25,
                        "carBand" : "郑州日产"
                    }
                ]
            }
        ]
    };
    var bandId=
    {
        "Code" : 1,
        "Data" : [
            {
                "id"   : 81,
                "name" : "北京现代ix35"
            },
            {
                "id"   : 82,
                "name" : "索纳塔八"
            },
            {
                "id"   : 83,
                "name" : "瑞纳"
            },
            {
                "id"   : 84,
                "name" : "朗动"
            },
            {
                "id"   : 85,
                "name" : "悦动"
            },
            {
                "id"   : 86,
                "name" : "名图"
            },
            {
                "id"   : 87,
                "name" : "途胜"
            },
            {
                "id"   : 88,
                "name" : "北京现代ix25"
            },
            {
                "id"   : 89,
                "name" : "伊兰特"
            },
            {
                "id"   : 90,
                "name" : "全新胜达"
            },
            {
                "id"   : 402,
                "name" : "索纳塔九"
            }
        ]
    };
    ajaxCarBand();
});
//$(function(){
//    var id = getUrlParam("id");
//    //事件监听
//    (function bindEvent(){
//
//        //动画
//        $(".choose").click(function(){
//            carBandAnimate();
//            $(".main>.hot_band>.article>a").click(function(){
//                closeCarBandAnimate();
//                $(".choose").attr("data-id",$(this).attr("data-id")).html($(this).html());
//                chooseCB(ajaxCar);
//            });
//            $(".main>.car_band>a").click(function(){
//                closeCarBandAnimate();
//                $(".choose").attr("data-id",$(this).attr("data-id")).html($(this).html());
//                chooseCB(ajaxCar);
//            });
//            $(".choose_carband>.head>img").click(function(){
//                closeCarBandAnimate();
//            });
//        });
//
//        $(".car>select").change(function(){
//            ajaxMainData();
//        });
//
//        $(".submit").click(function(){
//            var regPhone = /^1[3-9]\d{9}$/,str = $("input[name=tel]").val();
//            if($(".choose").attr("data-id")==null){
//                alert("请选择汽车品牌。");
//                return false;
//            }
//            if($(".car>select").find("option:selected").val()==''){
//                alert("请选择车型。");
//                return false;
//            }
//            if($("input[name=name]").val()==''){
//                alert("请输入姓名。");
//                return false;
//            }
//            if(regPhone.test(str) == false){
//                alert("请输入正确的电话号码");
//                return false;
//            }
//            var postData = {
//                carId : $(".choose").html(),
//                tel: $("input[name=tel]").val(),
//                name: $("input[name=name]").val(),
//                userId:2,
//                cityId: $.cookie("cityId")
//            };
//            $.ajax({
//                type: 'get',
//                data: postData,
//                url: "",
//                success: function(data) {
//                    alert('已报名成功，团长会尽快与您联系！');
//                    window.location.href = 'index.html';
//                }
//            });
//
//        })
//    })();
//
//    //请求mainData
//    function ajaxMainData(){
//        ajaxMain(drawMain);
//    }
//    function ajaxMain(callback){
//        var mainData=
//        {
//            cityId:id,
//            carId:$(".car>select").find("option:selected").val()
//        };
//        alert(mainData.carId);
//        callback(main);
//        //$.ajax({
//        //    url:"",
//        //    type:"get",
//        //    dataType:"json",
//        //    data:mainData,
//        //    success:function(data){
//        //        callback(data);
//        //    }
//        //})
//    }
//    function drawMain(data){
//        $.each(data.Data,function(value,key){
//            var that = data.Data;
//            $(".product_banner").children("div").children("p").html(that.title);
//            $(".product_banner").css("background-image", "url('" + that.picUrl + "')");
//            $(".reward>.help>b").eq(1).text(that.discount.substring(2,that.discount.length));
//            $(".reward>.application>b").text(that.signUpNum);
//            //$(".reward>.bgc>b").eq(0).text(that.limit);
//            //$(".reward>.bgc>b").eq(1).text(that.signUpNum);
//            $(".b").text(that.subTitle);
//        })
//    }
//    //设置默认品牌
//    function setCarBand(id,data,callback){
//        alert(id);
//        for(var i = 0;i < data.length;i++){
//            console.log(data[i].carBand);
//            for(var j = 0;j < data[i].carBand.length;j++){
//                console.log(data[i].carBand[j]);
//                if(id == data[i].carBand[j].id){
//                    $(".choose").attr("data-id",data[i].carBand[j].id).html(data[i].carBand[j].carBand);
//                    console.log(data[i].carBand[j].id);
//                    callback();
//                    return 0;
//                }
//            }
//        }
//    }
//    function chooseCB(callback){
//        //监听点击事件
//        callback();
//    }
//    function ajaxCarBand(){
//        //carBandUrl
//        ajaxCB(eachCarBand);
//
//    }
//    function ajaxCar(){
//        var bandId = $(".choose").attr("data-id");
//        //carUrl
//        ajaxC(bandId,eachCar);
//    }
//    //遍历carBand 绘制网页
//    function eachCarBand(data){
//        if(data == null || data.code == 0){
//            return false;
//        }
//
//        for(var i = 0;i < data.Data.length;i++){
//            for(var j = 0;j < data.Data[i].carBand.length;j++){
//                $(".car_band").eq(i).append("<a href='javascript:void(0)' data-id='"+data.Data[i].carBand[j].id+"'>"+data.Data[i].carBand[j].carBand+"</a>");
//            }
//        }
//        if(!!id){
//            alert(id);
//            setCarBand(id,data.Data,ajaxCar);
//        }
//
//    }
//    //遍历car 并绘制网页
//    function eachCar(data){
//        $(".car>select>option").remove();
//        $(".car>select").append("<option value=''>请选择车型</option>");
//        $.each(data.Data,function(value,key){
//            $(".car>select").append("<option value='"+this.id+"'>"+this.name+"</option>")
//        });
//    }
//    //ajax carBand
//    function ajaxCB(callback){
//        callback(carB);
//        //$.ajax({
//        //    url:"",
//        //    type:"get",
//        //    dataType:"json",
//        //    success:function(data){
//        //        callback(data);
//        //    }
//        //})
//    }
//    //ajax car
//    function ajaxC(data,callback){
//        callback(bandId);
//        //$.ajax({
//        //    url:"",
//        //    type:"get",
//        //    dataType:"json",
//        //    data:{
//        //        bandId:data
//        //    },
//        //    success:function(data){
//        //        callback(data);
//        //    }
//        //})
//    }
//    function carBandAnimate(){
//        $(".choose_carband").css("display",'block');
//    }
//    function closeCarBandAnimate(){
//        $(".choose_carband").css("display",'none');
//    }
//
//var main=
//{
//    "Code"         : 1,
//    "Data"         : {
//        "id"           : 9,
//        "cityId"       : 239,
//        "carId"        : 78,
//        "title"        : "宝来 2015款 质惠版 1.6L 自动舒适型",
//        "subTitle"     : "注：此价格全国最低价，还送导航，价格绝对优惠！",
//        "tuanTime"     : "\/Date(1444207798387)\/",
//        "price"        : "￥10.93万",
//        "consultPrice" : "￥12.53万",
//        "discount"     : "优惠1.6万",
//        "limit"        : 13,
//        "signUpNum"    : 17,
//        "hot"          : 0,
//        "carband"      : "一汽-大众",
//        "countryType"  : "德系",
//        "name"         : "宝来",
//        "picUrl"       : "http://img.uumaiche.com/car/413_275/14144761612820_pcb.jpg"
//    }
//};
//var carB=    //测试数据
//{
//    "Code"    : 1,
//    "Data"    : [
//        {
//            "pinYin"  : "B",
//            "carBand" : [
//                {
//                    "id"      : 4,
//                    "carBand" : "宝马"
//                },
//                {
//                    "id"      : 5,
//                    "carBand" : "北京奔驰"
//                },
//                {
//                    "id"      : 9,
//                    "carBand" : "北京现代"
//                },
//                {
//                    "id"      : 26,
//                    "carBand" : "北京汽车"
//                },
//                {
//                    "id"      : 31,
//                    "carBand" : "一汽奔腾"
//                },
//                {
//                    "id"      : 33,
//                    "carBand" : "比亚迪"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "C",
//            "carBand" : [
//                {
//                    "id"      : 15,
//                    "carBand" : "长安铃木"
//                },
//                {
//                    "id"      : 18,
//                    "carBand" : "长安马自达"
//                },
//                {
//                    "id"      : 23,
//                    "carBand" : "昌河铃木"
//                },
//                {
//                    "id"      : 29,
//                    "carBand" : "长城汽车"
//                },
//                {
//                    "id"      : 34,
//                    "carBand" : "长安汽车"
//                },
//                {
//                    "id"      : 41,
//                    "carBand" : "长安福特"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "D",
//            "carBand" : [
//                {
//                    "id"      : 11,
//                    "carBand" : "东风日产"
//                },
//                {
//                    "id"      : 14,
//                    "carBand" : "东风悦达起亚"
//                },
//                {
//                    "id"      : 19,
//                    "carBand" : "东风本田"
//                },
//                {
//                    "id"      : 27,
//                    "carBand" : "东南汽车"
//                },
//                {
//                    "id"      : 36,
//                    "carBand" : "东风启辰"
//                },
//                {
//                    "id"      : 42,
//                    "carBand" : "道奇"
//                },
//                {
//                    "id"      : 47,
//                    "carBand" : "东风雪铁龙"
//                },
//                {
//                    "id"      : 49,
//                    "carBand" : "东风标致"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "F",
//            "carBand" : [
//                {
//                    "id"      : 53,
//                    "carBand" : "菲亚特"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "G",
//            "carBand" : [
//                {
//                    "id"      : 10,
//                    "carBand" : "广汽丰田"
//                },
//                {
//                    "id"      : 13,
//                    "carBand" : "广汽三菱"
//                },
//                {
//                    "id"      : 17,
//                    "carBand" : "广汽本田"
//                },
//                {
//                    "id"      : 37,
//                    "carBand" : "广汽传祺"
//                },
//                {
//                    "id"      : 39,
//                    "carBand" : "观致"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "H",
//            "carBand" : [
//                {
//                    "id"      : 38,
//                    "carBand" : "红旗"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "J",
//            "carBand" : [
//                {
//                    "id"      : 43,
//                    "carBand" : "Jeep"
//                },
//                {
//                    "id"      : 52,
//                    "carBand" : "捷豹"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "K",
//            "carBand" : [
//                {
//                    "id"      : 44,
//                    "carBand" : "克莱斯勒"
//                },
//                {
//                    "id"      : 45,
//                    "carBand" : "凯迪拉克"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "L",
//            "carBand" : [
//                {
//                    "id"      : 20,
//                    "carBand" : "雷克萨斯"
//                },
//                {
//                    "id"      : 48,
//                    "carBand" : "雷诺"
//                },
//                {
//                    "id"      : 51,
//                    "carBand" : "路虎"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "M",
//            "carBand" : [
//                {
//                    "id"      : 7,
//                    "carBand" : "MINI"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "N",
//            "carBand" : [
//                {
//                    "id"      : 32,
//                    "carBand" : "纳智捷"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "O",
//            "carBand" : [
//                {
//                    "id"      : 24,
//                    "carBand" : "讴歌"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "Q",
//            "carBand" : [
//                {
//                    "id"      : 21,
//                    "carBand" : "起亚（进口）"
//                },
//                {
//                    "id"      : 30,
//                    "carBand" : "奇瑞"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "S",
//            "carBand" : [
//                {
//                    "id"      : 1,
//                    "carBand" : "上海大众"
//                },
//                {
//                    "id"      : 3,
//                    "carBand" : "斯柯达"
//                },
//                {
//                    "id"      : 6,
//                    "carBand" : "smart"
//                },
//                {
//                    "id"      : 12,
//                    "carBand" : "斯巴鲁"
//                },
//                {
//                    "id"      : 35,
//                    "carBand" : "上汽荣威"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "T",
//            "carBand" : [
//                {
//                    "id"      : 40,
//                    "carBand" : "通用雪佛兰"
//                },
//                {
//                    "id"      : 46,
//                    "carBand" : "通用别克"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "W",
//            "carBand" : [
//                {
//                    "id"      : 28,
//                    "carBand" : "五菱"
//                },
//                {
//                    "id"      : 50,
//                    "carBand" : "沃尔沃"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "Y",
//            "carBand" : [
//                {
//                    "id"      : 2,
//                    "carBand" : "一汽奥迪"
//                },
//                {
//                    "id"      : 8,
//                    "carBand" : "一汽-大众"
//                },
//                {
//                    "id"      : 16,
//                    "carBand" : "一汽马自达"
//                },
//                {
//                    "id"      : 22,
//                    "carBand" : "一汽丰田"
//                }
//            ]
//        },
//        {
//            "pinYin"  : "Z",
//            "carBand" : [
//                {
//                    "id"      : 25,
//                    "carBand" : "郑州日产"
//                }
//            ]
//        }
//    ]
//};
//    var bandId=
//    {
//        "Code" : 1,
//        "Data" : [
//            {
//                "id"   : 81,
//                "name" : "北京现代ix35"
//            },
//            {
//                "id"   : 82,
//                "name" : "索纳塔八"
//            },
//            {
//                "id"   : 83,
//                "name" : "瑞纳"
//            },
//            {
//                "id"   : 84,
//                "name" : "朗动"
//            },
//            {
//                "id"   : 85,
//                "name" : "悦动"
//            },
//            {
//                "id"   : 86,
//                "name" : "名图"
//            },
//            {
//                "id"   : 87,
//                "name" : "途胜"
//            },
//            {
//                "id"   : 88,
//                "name" : "北京现代ix25"
//            },
//            {
//                "id"   : 89,
//                "name" : "伊兰特"
//            },
//            {
//                "id"   : 90,
//                "name" : "全新胜达"
//            },
//            {
//                "id"   : 402,
//                "name" : "索纳塔九"
//            }
//        ]
//    };
//    ajaxCarBand();
//});