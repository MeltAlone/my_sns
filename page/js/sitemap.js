var blogList = new Vue({
    el: "#blog_list",
    data: {
        blogList: []
    },
    methods: {
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            console.log("获取cookie,现在循环")
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                console.log(c)
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) != -1){
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
    },
    created: function () {
        let name = this.getCookie("curUser");
        axios({
            method: "get",
            url: "/queryBlogByName?name=" + name,
        }).then(function (resp) {
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
            console.log(resp.data.data)
            blogList.blogList = resp.data.data;
        });
    }
});