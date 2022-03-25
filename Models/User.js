const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    PhoneNumber: {
        type:String
    },
    Address: {
        type:String
    }
})

module.exports = mongoose.model("Users", UserSchema)