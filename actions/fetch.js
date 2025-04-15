// import {insertcurrency, saveAll } from "@/lib/db";

import { insertCurrency  , insertbBourse , readDate , updateCurrency , CheckTblEmpty , sql} from "../lib/db.js"; // wrong path
const columns = [
    'date' , 
    'time' , 
    'symbol' , 
    'name' , 
    'price' , 
    'change_percent' , 
    'unit' ,
]
export async function currency(allData) {
    // take the data form api 
    const { gold, currency, cryptocurrency } = allData;
    // check date 
    const currendate = cryptocurrency[0]['date'] ; 
    const readTabeldata = await readDate() ;    
    // check table is empty 
    const isempty = await CheckTblEmpty('Currency') ; 
    if(currendate ===  readTabeldata){ 
    await currency.map(cur=>{
                updateCurrency(cur.date , +cur.price , cur.symbol);
            }) ; 
        return ; 
    }    

    // insert data
    try {
        
            await currency.map(cur => {
                if(isempty === true){
                 insertCurrency(cur.date, +cur.price, cur.symbol);
                }
                else{
                 updateCurrency(cur.date , +cur.price , cur.symbol);
                }
            })
        

        
        await gold.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                if(columns.includes(key)){
                    arr.push(cur[key])
                }
                
            }
            // console.log(arr)
            arr.push("gold") ;
            insertbBourse(...arr)  
        })
                
        await currency.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                if(columns.includes(key)){
                    arr.push(cur[key])
                }
            }
            arr.push("currency") ; 
            insertbBourse(...arr) 
        })
        
        await cryptocurrency.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                if(columns.includes(key)){
                    arr.push(cur[key])
                }
            }
            arr.push("cryptocurrency") ; 
            insertbBourse(...arr) ;
        })

    } catch (error) {
        console.log(error) ; 
        return {message:"error"  , error:error}
    }
    // redirect or create session 
}


