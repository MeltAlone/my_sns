var dbutil = require("./DBUtil");

function insertUser(name, sex, phone, email, address, description, password, success) {
    var insertSql = "insert into user (`name`, `sex`, `phone`, `email`, `address`,`description`,`password`) values (?, ?, ?, ?, ?, ?, ?)";
    var params = [name, sex, phone, email, address, description, password];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryUserByPhone(phone, success) {
    var querySql = "select * from user where phone = ?;";
    var params = [phone];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryAllUser(success) {
    var querySql = "select * from user order by id desc;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}


module.exports.insertUser = insertUser;
module.exports.queryUserByPhone = queryUserByPhone;
module.exports.queryAllUser = queryAllUser;
