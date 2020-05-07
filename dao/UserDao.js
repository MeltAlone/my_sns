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

function queryUserByName(name, success) {
    var querySql = "select * from user where name = ?;";
    var params = [name];

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

function deleteUserById(id, success) {
    console.log(id);
    var querySql = "delete from user where id = ?;";
    var params = [id];

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

function changeUserMsg(name, email, address, description, success) {
    var querySql = "update user set email = ?, address = ?,description = ? where (name = ?);";
    var params = [ email, address, description, name];
    console.log(params);
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
module.exports.queryUserByName = queryUserByName;
module.exports.queryAllUser = queryAllUser;
module.exports.deleteUserById = deleteUserById;
module.exports.changeUserMsg = changeUserMsg;

