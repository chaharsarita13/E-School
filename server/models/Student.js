const mongoose = require('mongoose')

const StudentsSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String, 
    id : String,
    dob : String,
    classname: String, 
    gender: String,
    parents: String,
    address: String,
    details: String,
    role: {
        type: String,
        default: "newStudent"
    }
})

const StudentModel = mongoose.model("students", StudentsSchema);
module.exports = StudentModel;

