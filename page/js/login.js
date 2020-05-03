new Vue({
    el: "#login_box",

    data: {},

    computed: {
        sendLogin: function () {
            return function () {
                var phone = document.getElementById("login_phone").value;
                var password = document.getElementById("login_password").value;
                async function validate () {
                    var temp =  await axios({
                        method: "get",
                        url: "/queryUserByPhone?phone=" + phone
                    });
                    var data = temp.data.data;
                    console.log(data);
                    if(data.length === 0){
                        alert("该用户不存在");
                        return;
                    }

                    if(data[0].password !== password){
                        alert("密码错误");
                        return;
                    }

                    let d= new Date();
                    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
                    let expires = "expires=" + d.toGMTString();
                    document.cookie = "curUser" + "=" + data[0].name + ";" + ' ' + expires;

                    console.log(data[0].name);
                    if(data[0].name.startsWith("admin")){
                        window.location.href = "./admin.html"
                    }else {
                        window.location.href = "./index.html"

                    }
                }
                validate(password);
            }
        }
    }
})