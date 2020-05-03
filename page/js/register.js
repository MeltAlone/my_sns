var regBox = new Vue({
    el: "#reg_box",
    data: {
        vcode: "",
        rightCode: ""
    },
    computed: {
        changeCode: function() {
            return function () {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(function (resp) {
                    console.log(resp);
                    regBox.vcode = resp.data.data.data;
                    regBox.rightCode = resp.data.data.text;
                });
            }
        },
        sendComment: function () {
            let password = document.getElementById("reg_password").value;
            let phone = document.getElementById("reg_phone").value;
            let name = document.getElementById("reg_name").value;
            let email = document.getElementById("reg_email").value;


            return function () {

                if(!name || !phone || !email || !password){
                    alert("请输入完整")
                    return;
                }

                if(name.startsWith("admin")){
                    alert("非法用户名")
                    return;
                }
                if (phone.length !== 11){
                    alter("手机号非法")；
                    return;
                }

                if(!email.endsWith(".com")){
                    alert("非法邮箱")
                    return;
                }

                var code = document.getElementById("comment_code").value;
                if (code != regBox.rightCode) {
                    alert("验证码有误");
                    return;
                }
                async function reg () {
                    var resp = await axios({
                        method: "post",
                        url: "/addUser",
                        data: {
                            name: name,
                            phone: phone,
                            email: email,
                            password: password
                        }
                    });
                    var data = resp.data.msg;
                    console.log(data);
                    window.alert(data);
                    window.location.href = "./login.html";
                }
                reg();
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});