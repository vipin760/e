const express = require("express");
const ErrorHandler = require("./util/ErrorHandler");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path')


app.use(cors({
    origin:"http://localhost:5173"
}))
app.use('/upload',express.static(path.join(__dirname,'uploads')))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/",express.static("uploads"))






if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path: "config/.env"
    })
}

// router
const user_router = require('./controller/user');

  app.use('/api/user',user_router);
// app.post('/api/user/create-user',(req,res)=>{
//     console.log("working")
//     console.log("req.body",req.body);
//     console.log("req.body1",req.file);
//     res.status(201).send({data:"",message:"success.....!"});
// });

// error handler
app.use(ErrorHandler);

module.exports = app;