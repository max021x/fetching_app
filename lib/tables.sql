use Crypto ; 
go 

-- tables

CREATE TABLE [dbo].[Currency] (
    [id] INT NOT NULL IDENTITY(1,1),
    [date] VARCHAR(15) NOT NULL,
    [symbol] NVARCHAR(100) NOT NULL,
    [price] FLOAT NOT NULL,
    [timestamp] DATETIME DEFAULT GETDATE() , 
    CONSTRAINT [Currency_pkey] PRIMARY KEY CLUSTERED ([id])
);


CREATE TABLE [dbo].[Bourse] (
    [id] INT NOT NULL IDENTITY(1,1),
    [type] NVARCHAR(50) NOT NULL, -- gold, currency, cryptocurrency
    [date] VARCHAR(15) NOT NULL,
    [time] VARCHAR(5) NOT NULL,
    [symbol] NVARCHAR(100) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [price] FLOAT NOT NULL,
    [change_percent] FLOAT NOT NULL,
    [unit] NVARCHAR(50) NOT NULL,
    [timestamp] DATETIME DEFAULT GETDATE() , 
    CONSTRAINT [Borse_pkey] PRIMARY KEY CLUSTERED ([id])
);



TRUNCATE  TABLE Bourse ;TRUNCATE  TABLE Currency ;

