const mongoose = require('mongoose')


const hallSchema = new mongoose.Schema({
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
    CNIC: {
        type:String
    },
    Location: {
        type:String
    },
    Arrangements: {
        type:String
    },
    Banquet: {
        type:Boolean
    },
    Pictures: {
        type: Array
    },
    AvailableDates:{
        type:Array
    },
    Parking: {
        type: Boolean
    },
    verified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('Halls', hallSchema)