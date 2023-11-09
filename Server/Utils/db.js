const mysql = require('mysql2')
const constants = require('./constants')

const pool = mysql.createPool({
    user : constants.DB_USER,
    password :constants.DB_PASSWORD,
    database : constants.DB_DATABSE,
    host : 'localhost',
    port : 3306,
    waitForConnections : true,
    connectTimeout: 60000,
    connectionLimit : 10,
    queueLimit : 0,
    maxIdle : 10,
    enableKeepAlive : true,
    keepAliveInitialDelay : 0
})

module.exports = pool