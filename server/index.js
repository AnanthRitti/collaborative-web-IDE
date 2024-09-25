import express from 'express'
import cors from 'cors'
const app = express()
import 'dotenv/config'
import './models/db.js'



app.get("/" , (req,res) => {
    res.json({
        message : "hello"
    })
})

app.use(express.json())
app.use(cors())



import userRouter from './routes/user.routes.js'


app.use("/auth" , userRouter )

app.listen(process.env.port , () => {
    console.log(`listening on port ${process.env.port}`)
})