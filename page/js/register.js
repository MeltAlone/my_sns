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
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != regBox.rightCode) {
                    alert("验证码有误");
                    return;
                }

                var password = document.getElementById("reg_password").value;
                var phone = document.getElementById("reg_phone").value;
                var name = document.getElementById("reg_name").value;
                var email = document.getElementById("reg_email").value;
                axios({
                    method: "get",
                    url: "/addUser?name=" + name + "&phone=" + phone + "&email=" + email + "&password=" + password
                }).then(function (resp) {
                    alert(resp.data.msg);
                });
            }
        }
    },
    created: function () {
        this.changeCode();
    }
});