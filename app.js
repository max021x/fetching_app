const express = require('express') ; 
require('dotenv').config() ; 
const app = express() ; 


app.use(express.urlencoded({extended:false})) ; 
const port = process.env.APP_PORT ; 
app.listen(3000 , console.log('server is running on' , `http://127.0.0.1:${port}`));  

