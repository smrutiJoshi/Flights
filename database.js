require("dotenv").config();
const mysql = require('mysql2') ;


var connection = mysql.createConnection({
    /*host     : 'localhost',
    port     : '3308',
    user     : 'root',
    password : 'root',
    database : 'test'
    */
    host     : process.env.DB_HOST,
    
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.MYSQL_DB
 

});
 
connection.connect((err) =>{
    if(!err){
        console.log("Database Connected") ;
    }
    else{
        console.log("Database connection Error!!") ;
    }
    
});




module.exports = connection ;
