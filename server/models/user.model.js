import mongoose from "mongoose"
const Schema = mongoose.Schema

const user = new Schema({
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

const userModel = mongoose.model('users' , user)

export default userModel