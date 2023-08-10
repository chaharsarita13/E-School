const mongoose = require('mongoose')

const SettingSchema = new mongoose.Schema({
    group: String, 
    section: String, 
    label : String,
    type : String,
    role: {
        type: String,
        default: "newCustomSettingField"
    }
})

const SettingModel = mongoose.model("settings", SettingSchema);
module.exports = SettingModel;

