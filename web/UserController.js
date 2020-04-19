var UserDao = require("../dao/UserDao");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function addUser(request, response) {
    var params = url.parse(request.url, true).query;

    UserDao.insertUser(params.name, params.phone, params.email, params.password, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
    });
}
path.set("/addUser", addUser);

function queryUserByPhone(request, response) {
    var params = url.parse(request.url, true).query;

    UserDao.queryUserByPhone(params.phone, function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryUserByPhone", queryUserByPhone);

module.exports.path = path;