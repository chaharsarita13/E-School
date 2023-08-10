const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
// const UserSchema = new mongoose.Schema({
//     email: String,
//     password: String,
//     role: {
//         type: String,
//         default: "visitor"
//     }
// })

const UserSchema = new mongoose.Schema({
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
// UserSchema.plugin(uniqueValidator ,{message :''})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel