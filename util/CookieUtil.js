function getCookie(cname) {
    let name = cname + "=";
    let cookie = document.cookie.split(';');
    for(let i = 0, len = cookie.length; i < len; i++) {
        let c = cookie[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(c_name,value,expire) {
    var date=new Date()
    date.setSeconds(date.getSeconds()+expire)
    document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
}

function delCookie(c_name){
    setCookie(c_name, "", -1)
}

module.exports.getCooke = getCookie;
module.exports.setCooke = setCookie;
module.exports.delCeooke = delCookie;