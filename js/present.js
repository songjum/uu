/**
 * Created by w on 2015/10/20.
 */
$(function(){
    $(".submit").click(Ajax);
    function Ajax(url){
        $.ajax({
            url:url,
            type:"post",
            data:{
                "tel":$("input[name='tel']"),
                "name":$("input[name='name']"),
                "userId":"1"
            },
            success:function(data){
                alert("尊敬的"+$("input[name='name']")+"，感谢您的支持");
            },
            error:function(){
                return false;
            }
        })
    }
});