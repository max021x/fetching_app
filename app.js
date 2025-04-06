const express = require('express') ; 
const db = require('./lib/db.js') ; 
require('dotenv').config() ; 
const app = express() ; 

app.use(express.urlencoded({extended:false})) ; 


app.use('/' , async (req , res , next)=>{
        /* url is wrong */
        // fetch("https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency_v2.json")
        // .then(response=> response.json())
        // .then(data => console.log(data))
        // .catch(err=> console.log(err)) ;         

        // reading from db insted 

        const red = await db.readFromDatabase()  ;
        console.log(red) ; 
        next() ; 
})

app.use('/' , (req , res)=>{
        res.send('done 👍') ; 
})



const port = process.env.APP_PORT ; 
app.listen(port , console.log('server is running on' , `http://127.0.0.1:${port}`));  

