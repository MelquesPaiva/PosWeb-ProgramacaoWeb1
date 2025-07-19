const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'posweb_programacao1_mysql',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0   
})

module.exports = connection
