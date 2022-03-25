const mongoose = require('mongoose')

const caterSchema = new mongoose.Schema({
    Name: {
        type:String
    },
    Title: {
        type:String
    },
    Description: {
        type:String
    },
    PhoneNumber: {
        type:String
    },
    Location: {
        type:String
    },
    CNIC: {
        type:String
    },
    Pictures:{
        type:Array
    },
    Packages: {
        type:Array
    },
    AvailableDates:{
        type:Array
    },
    verified:{
        type:Boolean
    }

})

module.exports = mongoose.model('Caters', caterSchema)