let mysql = require("mysql");

function createConnection() {
    let connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "ylg7900",
        database: "my_sns"
    });
    return connection;
}

module.exports.createConnection = createConnection;