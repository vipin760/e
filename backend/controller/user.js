const express = require('express')
const { upload } = require('../multer')
const ErrorHandler = require('../util/ErrorHandler')
const path = require('path')
const User = require('../model/user')
const fs = require('fs')
const jwt = require('jsonwebtoken');
const transporter = require("../util/sendMail")
const sendToken = require("../util/jwtToken")
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router= express()




router.post("/create-user", upload.single("file"), async(req,res,next) =>{
    try {
        const {name, email, phone,password } =req.body
    const userEmail = await User.findOne({email:email})

    if(userEmail){
        const filename =req.file.filename;
        const filepath=`uploads/${filename}`
        fs.unlink(filepath,(err)=>{
            if(err){
                res.status(500).send({status:false ,data:'',message:"file deleting"})
            }else{
                res.status(500).send({status:false ,data:"",message:"file deleted successfully"})
            }
        })
        res.status(400).send({status:false, data:"",message:"email already exist"})
        return ;
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name:name, email:email, phone:phone, password:password,
        avatar:fileUrl
    }

    const activationToken = createActivationToken(user)
    try {
        const mailOption = {
            from:` "verify your email" <vipinm500@gmail.com> `,
            to:user.email,
            subject:"Activate your account",
            html:`<h2> ${user.name} thanks for registering </h2>
            <h4>please verify your email and continue....</h4>
            <a href="http://localhost:5173/activation/${activationToken}">verify email</a>`
            }
            transporter.sendMail(mailOption, function(err,info){ 
                if(err){
                    res.status(400).send({status:false, data: null, message: "Error sending verification email. Please try again later." })  
                }else{
                res.status(200).send({status:true,data:null,message:`welcome ${user.name} we will send confirmation email for your providing email address please verify`})
                }
                })



        
    } catch (error) {
        res.status(500).send({status:false, data:'', message:error.message})
    }
    
    
    } catch (error) {
        res.status(500).send({status:false, data:'',message:"internal server down"});
    }

})

//////create activeation token

const createActivationToken=(user)=>{
    return jwt.sign(user,process.env.ACTIVATION_SECRET,{expiresIn:'59m'})
}


//////activate user////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/activation',catchAsyncErrors( async(req,res,next)=>{
    console.log("working12")
    try{
        const token = req.body.activation_token
        const newUser = jwt.verify(token,process.env.ACTIVATION_SECRET);
        if(!newUser){
            res.status(400).send({status:false, data:"",message:"invalid token"});
        }else{
            const newUserExist = await User.findOne({email:newUser.email});
             if(newUserExist){
                res.status(400).send({status:false, data:'', message:"already verified"});
                return;
             }
            const {name, email, phone, password, avatar} = newUser

            User.create({
                name, email, avatar, password, phone
            })
        }
    }catch(error){
        res.status(500).send({statu:false, data:'', message:"internal server down"});
    }
}))



module.exports = router