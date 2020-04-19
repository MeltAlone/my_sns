var dbutil = require("./DBUtil");

function insertUser(name, phone, email, password, success) {
    var insertSql = "insert into user (`name`, `phone`, `email`, `password`) values (?, ?, ?, ?)";
    var params = [name, phone, email, password];

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

    console.log(querySql);

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
