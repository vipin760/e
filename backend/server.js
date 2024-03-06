const app = require("./app");
const port = process.env.PORT || 3000;
const connectDatabase = require('./db/Database')

// Handling uncaught Exception
process.on("uncaughtException", (err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
})

// config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env"
    })
}

//connect db
connectDatabase();

//create server

const server=app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

// unhandled promise error
process.on("unhandledRejection",(err)=>{
    console.log(`shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})