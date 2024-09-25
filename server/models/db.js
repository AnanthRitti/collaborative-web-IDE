import mongoose from "mongoose"

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("response")
}).catch((err)=>{
    console.log("MongoDb connection failed : " , err)
})


