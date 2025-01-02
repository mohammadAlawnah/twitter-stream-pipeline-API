import connectDB from "../DB/connection.js"
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import tweetRouter from './modules/tweet/tweet.router.js'

import cors from 'cors'

export const initApp = (app,express)=>{
    app.use(express.json())
    app.use(cors())

    connectDB();
    


    app.use('/auth',authRouter)
    app.use('/user',userRouter)
 
    app.use("/tweet",tweetRouter)

    

    app.use('/',(req,res)=>{
        res.json({message : 'welcome to tweet project'})
    })

    
    app.use('*',(req,res)=>{
        res.status(404).json({message : "page not found"})
    })

    app.use((err,req,res,next)=>{
        res.json({error  : "this error"})

    })

}
