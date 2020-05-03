let UserDao = require("../dao/UserDao");
let respUtil = require("../util/RespUtil");
let url = require("url");

let path = new Map();

function addUser(request, response) {
    request.on("data", function(data){
        var data = JSON.parse(data.toString());
        UserDao.insertUser(data.name,0, data.phone, data.email,"中国", "hahaha", data.password, function () {
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        });
    })
}
path.set("/addUser", addUser);

function queryUserByPhone(request, response) {
    let params = url.parse(request.url, true).query;

    UserDao.queryUserByPhone(params.phone, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryUserByPhone", queryUserByPhone);

function queryAllUser(request, response){
    UserDao.queryAllUser(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}

path.set("/queryAllUser", queryAllUser)

module.exports.path = path;