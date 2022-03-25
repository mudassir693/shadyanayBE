const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        default:""
    },
    Image:{
        type:String,
        default:""
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Teams',TeamSchema)