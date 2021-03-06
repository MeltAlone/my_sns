var blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply: function() {
            return function (commentId, userName) {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function () {
        var bid = -1;
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(function(resp){
            blogComments.comments = resp.data.data;
            for (var i = 0 ; i < blogComments.comments.length ; i ++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        });
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + bid
        }).then(function (resp) {
            blogComments.total = resp.data.data[0].count;
        }).catch(function(resp) {
            console.log("请求错误");
        });
    }
});

var sendComment = new Vue({
    el: "#send_comment",
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
                    sendComment.vcode = resp.data.data.data;
                    sendComment.rightCode = resp.data.data.text;
                });
            }
        },
        sendComment: function () {
            return function () {
                var code = document.getElementById("comment_code").value;
                if (code != sendComment.rightCode) {
                    alert("验证码有误");
                    return;
                }
                var bid = -1;
                var reply = document.getElementById("comment_reply").value;
                var replyName = document.getElementById("comment_reply_name").value;
                var name = document.getElementById("comment_name").value;
                var email = document.getElementById("comment_email").value;
                var content = document.getElementById("comment_content").value;
                axios({
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
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

var AboutMe = new Vue({
    el: "#about_me",
    data: {
        person: {},
        change_email: "",
        change_address: "",
        change_description: "",
        showDiong: false,
        careList: [],
        fansList: []
    },
    methods: {
        changeMsg(){
            var name = this.getCookie("curUser");
            axios({
                method: "get",
                url: `/changeUserMsg?name=${name}&email=${this.change_email}&address=${this.change_address}&description=${this.change_description}`
            }).then(resp => {
                console.log(resp);
                AboutMe.showDiong = false;
            })
        },
        showD(){
            this.showDiong = true;
        },
        fadeD(){
            this.showDiong = false;
        },
        //获取cookie
        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
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
    created(){
        let name = this.getCookie("curUser");
        axios({
            method: "get",
            url: "/queryUserByName?name=" + name,
        }).then(res => {
            AboutMe.person = res.data.data[0];
        });
        axios({
            method: "get",
            url: "/searchCareByCarer?carer=" + name,
        }).then(res => {
            console.log(res.data);
            AboutMe.fansList = res.data.data;
        });
        axios({
            method: "get",
            url: "/searchCareByFans?fans=" + name,
        }).then(res => {
            console.log(res.data);
            AboutMe.careList = res.data.data;
        });
    }
})

