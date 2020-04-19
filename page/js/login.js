new Vue({
    el: "#login_box",

    data: {},

    computed: {
        sendLogin: function () {
            return function () {
                var phone = document.getElementById("login_phone").value;
                var password = document.getElementById("login_password").value;
                axios({
                    method: "get",
                    url: "/queryUserByPhone?phone=" + phone + "&password=" + password
                }).then(function (resp) {
                    console.log(resp.data);
                });
            }
        }
    }
})