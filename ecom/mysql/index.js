const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();
 
//files
const mysqlDb = require('./config/db.config'); 

const usersRoute = require('./src/routes/userRoute'); 
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/app/v1/users',usersRoute);

 

app.listen(process.env.PORT,()=>{
    console.log('Server Running');
});

