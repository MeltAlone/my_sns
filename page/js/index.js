var everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。"
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content;
            console.log(resp.data.data[0].content);
        }).catch(function (resp) {
            console.log("请求失败");
        })
    }
})

var articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: []
    },
    computed: {
        jumpTo: function() {
            return function (page) {
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function() {
            return function (page, pageSize) {
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";
                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if (tag == "") {//不是查询情况
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            var tempTime = parseInt(result[i].ctime);
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = `${new Date(tempTime).getFullYear()}年${new Date(tempTime).getMonth() + 1} 月${new Date(tempTime).getDate()}日${new Date(tempTime).getHours() + 1}时${new Date(tempTime).getMinutes()}分`
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.uname = result[i].uname;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                } else {
                    axios({
                        method: "get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp) {
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            var tempTime = parseInt(result[i].ctime);
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = `${new Date(tempTime).getFullYear()}年${new Date(tempTime).getMonth() + 1} 月${new Date(tempTime).getDate()}日${new Date(tempTime).getHours() + 1}时${new Date(tempTime).getMinutes()}分`
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTagCount?tag=" + tag
                    }).then(function(resp) {
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                }

            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            articleList.pageNumList = result;
            return result;
        }
    },
    methods:{
        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            console.info(document.cookie);
        },

        searchUser(uname){
            console.log(uname);
            this.setCookie("searchUser",uname,1);
            window.location.href = "./UserInfo.html";
        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }
})

var loginBar = new Vue({
    el: "#login_bar",
    data: {
        userName: "未登录"
    },
    methods: {
        getCurName () {
             loginBar.userName = getCookie("curUser");
        },
        exit(){
            delCookie("curUser");
            window.location.href = "./login.html"
        }
    },
})


window.onload = function () {
    loginBar.getCurName();
}

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
    document.cookie=c_name+ "="+value+"; expires="+date.toGMTString()
}

function delCookie(c_name){
    setCookie(c_name, "", -1)
}