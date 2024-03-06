const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    auth:{
        user:process.env.EMAIL_ADRRESS,
        pass:process.env.REGISTER_PASSWORD
    },
    tls:{
        rejectUnauthorized:false
    }
  })

  module.exports = transporter

//   const mailOption = {
//     from:` "verify your email" <vipinm500@gmail.com> `,
//     to:doctorData.email,
//     subject:"hello please verify your email",
//     html:`<h2> ${doctorData.name} thanks for registering </h2>
//     <h4>please verify your email and continue....</h4>
//     <a href="http://localhost:4200/api/doctor/verify-email?token=${doctorData.emailToken}">verify email</a>`
//     }
//     transporter.sendMail(mailOption, function(err,info){ 
//         if(err){
//             res.status(HTTP_BAD_REQUEST).send({sattus:false, data: null, message: "Error sending verification email. Please try again later." })  
//         }else{
//         res.status(HTTP_OK).send({status:true,data:null,message:`welcome ${name} we will send confirmation email for your providing email address please verify`})
//         }
//         })

    