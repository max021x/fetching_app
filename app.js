const express = require('express') ; 
require('dotenv').config() ; 
const app = express() ; 

app.use(express.urlencoded({extended:false})) ; 


app.use('/' , (req , res)=>{
        /* url is wrong */
        // fetch("https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency_v2.json")
        // .then(response=> response.json())
        // .then(data => console.log(data))
        // .catch(err=> console.log(err)) ;         

        // reading from db insted 

})



const port = process.env.APP_PORT ; 
app.listen(port , console.log('server is running on' , `http://127.0.0.1:${port}`));  

