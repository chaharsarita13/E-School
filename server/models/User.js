const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")


const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        // type:Number,
        // unique:true,
        required: true
    },
    email: {
        type:String,
        unique:true,
        required: true
    },
    password: {
        type: String,
         required: true
    },
    role: {
        type: String,
        default: "visitor"
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel