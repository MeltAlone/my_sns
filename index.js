let express = require("express");
let globalConfig = require("./config");
let loader = require("./loader");
let cookie = require("cookie-parser");

let app = new express();

app.use(express.static(globalConfig["page_path"], {index: "login.html"}));
app.use(cookie());

loader.init(app); // get请求太多，放到loader中初始化吧

app.get("/api/*", function (request, response, next) {
    // express 拦截器判断用户是否登录
    console.log(request.cookies);
    if (request.cookies.curUser) {
        next();
    } else {
        response.redirect("/login.html")
    }
})

app.post("/editEveryDay", loader.pathMap.get("/editEveryDay"));
app.post("/editBlog", loader.pathMap.get("/editBlog"));
app.post("/addUser", loader.pathMap.get("/addUser"));


app.listen(globalConfig["port"], function() {
    console.log("服务器已启动")
})