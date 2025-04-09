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




-- my settings

ALTER DATABASE Crypto SET SINGLE_USER WITH ROLLBACK IMMEDIATE; 

GO 

ALTER DATABASE Crypto COLLATE arabic_ci_ai ; 

GO 

ALTER DATABASE Crypto SET MULTI_USER; 

GO 



GRANT CONTROL ON DATABASE::[Crypto] TO [hadmin];
GO


USE [Crypto]; -- Switch to the target database
GO

-- Grant all permissions to the user
GRANT CONTROL ON DATABASE::[Crypto] TO [hadmin];
GO
