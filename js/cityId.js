/**
 * Created by w on 2015/10/21.
 */
//获取url中的参数
function getUrlParam(id) {
    var reg = new RegExp("(^|&)" + id + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return r[2];//返回参数值
}
//根据城市获得API
function getApi(){
    var tmp = window.location.origin.split('.')[1];
    var _tempUrl,_tempName,_tempId;
    switch(tmp){
        case "fz":
            _tempName = "福州";
            _tempId  = 77;
            _tempUrl = 'http://m.fz.uumaiche.com/';
            break;
        case "qz":
            _tempName = "泉州";
            _tempId  = 239;
            _tempUrl = 'http://m.qz.uumaiche.com/';
            break;
        case "xm":
            _tempName = "厦门";
            _tempId  = 322;
            _tempUrl = 'http://m.xm.uumaiche.com/';
            break;
        case "pt":
            _tempName = "莆田";
            _tempId  = 222;
            _tempUrl = 'http://m.pt.uumaiche.com/';
            break;
        case "sm":
            _tempName = "三明";
            _tempId  = 243;
            _tempUrl = 'http://m.sm.uumaiche.com/';
            break;
        case "nd":
            _tempName = "宁德";
            _tempId  = 213;
            _tempUrl = 'http://m.nd.uumaiche.com/';
            break;
        case "hhht":
            _tempName = "呼和浩特";
            _tempId  = 118;
            _tempUrl = 'http://m.hhht.uumaiche.com/';
            break;
        case "ly":
            _tempName = "龙岩";
            _tempId = 187;
            _tempUrl = 'http://m.ly.uumaiche.com/';
            break;
        default:
            _tempName = "泉州";
            _tempId  = 239;
            _tempUrl = 'http://m.uumaiche.com/';
            break;
    }

    return {
        CityId:_tempId,
        CityName:_tempName,
        ApiUrl:_tempUrl
    };
}