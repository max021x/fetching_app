const express = require('express') ; 
const db = require('./lib/db.js') ; 
const actions = require('./actions/fetch.js') ; 
// =======> we need currency method here ./actions/fetch.js
require('dotenv').config() ; 
const app = express() ; 

app.use(express.urlencoded({extended:false})) ; 


app.use('/' , async (req , res , next)=>{
              
        await fetch("https://BrsApi.ir/Api/Market/Gold_Currency.php?key=FreeWLWlJd3lthRPas4z2GdwBD2dz7JF")
        // await fetch("http://localhost:8080/api/Gold_Currency.php.json")
        .then(response=> response.json())
        .then(data => actions.currency({...data}))
        .catch(err=> console.log(err)) ;         

        next() ; 
})

app.use('/' , async (req , res)=>{
        res.send('done 👍') ; 
})



const port = process.env.APP_PORT ; 
app.listen(port , console.log('server is running on' , `http://127.0.0.1:${port}`));  

