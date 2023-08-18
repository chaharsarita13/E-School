const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    id : Number,
    dob : String,
    classname: Number, 
    gender: String,
    parents: String,
    address: String,
    details: String,
    customFields : Object,
    role: {
        type: String,
        default: "newStudent"
    }
})

const StudentModel = mongoose.model("students", StudentsSchema);
module.exports = StudentModel;




