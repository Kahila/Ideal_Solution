//file containing method concerning the database
var mysql = require('mysql');

//connecting to server
function conn() {
    return (mysql.createConnection({
        host: "localhost",
        user: "",
        password: "",
        port: ""
    }));
}

module.exports = { conn };