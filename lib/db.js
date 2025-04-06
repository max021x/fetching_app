import sql from "mssql" ; 


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


export async function readDate() {
  try {
    await sql.connect(sqlConfig) ;
    const request = new sql.Request() ; 
    const query = `SELECT [date] FROM [dbo].[Bourse] 
                  ORDER BY [date] DESC ` ; 
    const query2 = `SELECT max([date]) FROM [dbo].[Bourse] 
                  ` ; 
    
    const result = await request.query(query2) ; 
    const record = result.recordset ; 
    if(record.length > 0){
      return record[0]['']
    }
    
  } catch (error) {
    console.log('mission failed .....' , err) ;  
  }
  finally{
    sql.close() ; 
  }
}


export async function insertCurrency(date , price , symbol) {
  try {
    await sql.connect(sqlConfig);
    
    const request = new sql.Request();

    const query = `
      INSERT INTO [dbo].[Currency] ([date], [price], [symbol])
      VALUES (@date, @price, @symbol)
    `;

    // rAdd input parametes
    request.input('date', sql.VarChar(10) , date);
    request.input('price', sql.Float, price);
    request.input('symbol', sql.VarChar(10), symbol);

    // Execute the query
    const result = await request.query(query);
    console.log('Data inserted successfully:', result);
  } catch (err) {
    console.error('Error inserting data:' ,date , price , symbol , err);
  } 
}

export async function insertbBourse(
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
    request.input('type', sql.NVarChar(20), type);
    request.input('date', sql.VarChar(10) , date);
    request.input('time', sql.VarChar(5), time);
    request.input('symbol', sql.VarChar(10), symbol);
    request.input('name', sql.NVarChar(50), name);
    request.input('price', sql.Float, price);
    request.input('change', sql.Float, change);
    request.input('unit', sql.NVarChar(20), unit);

    // Execute the query
    const result = await request.query(query);
    console.log('Data inserted successfully:', result);
    
  } catch (err) {
    console.error('Error inserting data:' ,date , price , symbol , err);
  } 
}





