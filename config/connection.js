const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Porterhouse%77",
    database: "empdb"
})

module.exports = db;