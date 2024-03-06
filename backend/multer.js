const multer  = require('multer');


const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,"uploads/");
    },
    filename: function (req, file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const filename = file.originalname.split(".")[0];
        cb(null,`${uniqueSuffix}-${file.originalname}`);
    },
})

exports.upload = multer({storage:storage})