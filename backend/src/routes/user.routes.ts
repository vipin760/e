import Routes, {Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
const routes = Routes()

routes.get("/", asyncHandler ( async(_req:Request,res:Response)=>{
    try {
        res.status(200).send({data:'',message:"user routes working"})
    } catch (error) {
        res.status(500).send({data:'',message:"internal server down"})
    }
}))


export default routes