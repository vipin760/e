import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const port = process.env.PORT || 3000;
const app = express()
app.use(express.json())
app.use(cors({
  origin:process.env.ORIGIN_CORS
}))

import user_routes from '../src/routes/user.routes'

app.use('/api/user',user_routes)



app.listen(port,()=>{
  console.log(process.env.CORS_ORIGIN);
  
  console.log(`server running port ${port}`);
  
})


