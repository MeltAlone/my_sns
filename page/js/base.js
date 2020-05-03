var randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ["css", "html5", "javascript", "jquery", "webpack", "react", "vuex", "typescript"]
    },
    computed: {
        randomColor: function () {
            return function () {
                var red = Math.random() * 255;
                var green = Math.random() * 255;
                var blue = Math.random() * 255;
                return "rgb(" + red + "," + green + "," + blue + ")"
            }
        },
        randomSize: function () {
            return function () {
                var size = Math.random() * 20 + 12 + "px";
                return size;
            }
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                result.push({text:resp.data.data[i].tag, link:"/index.html?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        });
    }
})

var newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        });
    }
})

var newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: []
    },

created: function () {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (resp) {
            console.log(resp);
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;

                temp.date = parseInt(resp.data.data[i].ctime);
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        });
    }
})
try {
    var userSpan = document.getElementById("curUserName");
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
    var username = getCookie("curUser");
    (function (){
        if(username){
            userSpan.innerText = username;
        }
    }())
}catch (e) {

}
