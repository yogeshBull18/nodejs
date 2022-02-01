const mysql = require('mysql');

const mysqlDb = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mysqlnode",
});

mysqlDb.connect((err)=>{
    if(err) throw err;
    console.log('Database Connected');
});

module.exports = mysqlDb;