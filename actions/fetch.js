// import {insertcurrency, saveAll } from "@/lib/db";

import { insertCurrency  , insertbBourse , readDate } from "@/lib/db"; // wrong path
export async function currency(allData) {
    // take the data form api 
    const { gold, currency, cryptocurrency } = allData;
    // check date 
    const currendate = cryptocurrency[0]['date'] ; 
    const readTabeldata = await readDate() ; 
    if(currendate ===  readTabeldata){ 
        return ; 
    }    

    // insert data
    try {
        // console.log(currency)
        await currency.map(cur => {
            insertCurrency(cur.date, +cur.price, cur.symbol);
        })
        
        
        await gold.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                arr.push(cur[key])
            }
            arr.push("gold") ;
            insertbBourse(...arr)  
        })
                
        await currency.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                arr.push(cur[key])
            }
            arr.push("currency") ; 
            insertbBourse(...arr) 
        })
        
        await cryptocurrency.map(cur => {
            const arr = [] 
            for(let key of Object.keys(cur)){
                arr.push(cur[key])
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


