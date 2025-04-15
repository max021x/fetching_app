// import sql from "mssql" ; 
// import dotenv from "dotenv"  ;
// dotenv.config() ; 

// sql.Request ? 

const sql = require('mssql') ;
require('dotenv').config(); 

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  // port: +process.env.DB_PORT,
  
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}


async function readFromDatabase() {
  try {
    await sql.connect(sqlConfig) ;
    const request = new sql.Request() ; 
    const query = `SELECT * FROM [dbo].[Bourse] 
                  ORDER BY [date] DESC ` ; 
    
    const result = await request.query(query) ; 
    const record = result.recordset ; 
    return record;
    
  } catch (err) {
    console.log('mission failed ..... readFromData' , err) ;  
  }
}


async function readDate() {
  try {
    await sql.connect(sqlConfig) ;
    const request = new sql.Request() ; 
    const query = `SELECT max([date]) FROM [dbo].[Bourse] ` ; 

    const result = await request.query(query) ; 
    const record = result.recordset ; 
    if(record.length > 0){
      return record[0]['']
    }
    
  } catch (err) {
    console.log('mission failed ..... readDate' , err) ;  
  }

}


async function insertCurrency(date , price , symbol) {
  try {
    await sql.connect(sqlConfig);
    
    const request = new sql.Request();

    const query = `
      INSERT INTO [dbo].[Currency] ([date], [price], [symbol])
      VALUES (@date, @price, @symbol)
    `;

    // rAdd input parametes
    request.input('date', sql.VarChar(15) , date);
    request.input('price', sql.Float, price);
    request.input('symbol', sql.NVarChar(100), symbol);

    // Execute the query
    await request.query(query);
  } catch (err) {
    console.error('Error inserting data: insertCurrency' , err);
  } 
}

async function insertbBourse(
  date , 
  time , 
  symbol , 
  name , 
  price , 
  change , 
  unit ,
  type 
) {
  try {
    await sql.connect(sqlConfig);

    const request = new sql.Request();

    const query = `
      INSERT INTO [dbo].[Bourse] ([type], [date], [time]  , [symbol] , [name] , [price]  , [change_percent] , [unit])
      VALUES (@type, @date, @time, @symbol , @name , @price ,@change ,@unit)
    `;

    // rAdd input parametes
    request.input('type', sql.NVarChar(50), type);
    request.input('date', sql.VarChar(15) , date);
    request.input('time', sql.VarChar(5), time);
    request.input('symbol', sql.NVarChar(100), symbol);
    request.input('name', sql.NVarChar(100), name);
    request.input('price', sql.Float, price);
    request.input('change', sql.Float, change);
    request.input('unit', sql.NVarChar(50), unit);

    // Execute the query
    await request.query(query);
    
  } catch (err) {
    console.error('Error inserting data: insertbBourse' , err);
  } 
}


// a fuction to update currency table 
async function updateCurrency(
  date ,
  price, 
  symbol 
) 
{
  try {
    await sql.connect(sqlConfig) ;
    const query = 
    `UPDATE [dbo].[Currency]
    SET 
    [price] =  @price , 
    [timestamp] = GETDATE()
    WHERE [date] = @date AND [symbol] = @symbol 
    ` ; 
    const request = new sql.Request() ;  

    request.input('date' , sql.VarChar(15), date);
    request.input('price' , sql.Float , price);
    request.input('symbol' , sql.NVarChar(100) , symbol);

    await request.query(query) ; 
  } catch (err) {
    console.log(err) ;
  }
}

async function CheckTblEmpty(tbl_name) {
  try {
    await sql.connect(sqlConfig) ; 
    const query = `SELECT COUNT(*) FROM [dbo].[${tbl_name}]` ; 
    const request = new sql.Request() ; 
    const count = await request.query(query) ; 
    return count['recordset'][0][''] === 0; 

  } catch (err) {
    console.log("checkif empty:" , err) ; 
  }
}


module.exports = {readFromDatabase  , readDate , insertCurrency , insertbBourse , updateCurrency , CheckTblEmpty , sql} ; 