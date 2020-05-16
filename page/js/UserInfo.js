var SearchUser = new Vue({
    el: "#app",
    data: {
        userInfo:{},
        blogList:[],
        isAdd: true,
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
        addCare(){
            let fans = this.getCookie("curUser");
            let carer = this.getCookie("searchUser");
            axios({
                method: "get",
                url: "/addCare?carer=" + carer + "&fans=" + fans,
            }).then(res => {
                alert(res.data.msg)
                SearchUser.isAdd = false;
            })
        }
    },
    created(){
        var searchUser = (function getCookie(cname) {
            let name = cname + "=";
            let cookie = document.cookie.split(';');
            for(let i = 0, len = cookie.length; i < len; i++) {
                let c = cookie[i].trim();
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        })("searchUser");
        console.log(searchUser);
        axios({
            method: "get",
            url: "/queryUserByName?name=" + searchUser,
        }).then(res => {
            SearchUser.userInfo = res.data.data[0];
        })
        let name = this.getCookie("searchUser");
        axios({
            method: "get",
            url: "/queryBlogByName?name=" + name,
        }).then(function (resp) {
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
            console.log(resp.data.data)
            SearchUser.blogList = resp.data.data;
        });
    }
})