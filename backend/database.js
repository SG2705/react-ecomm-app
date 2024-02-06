const mysql = require('mysql2');

// Creating database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecomm"
});

module.exports = db