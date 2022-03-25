const mongoose = require('mongoose')

const DateSchema = new mongoose.Schema({
    // Service Provider ID (SPId)
    SPId: {
        type: String   
    },
    Date:{
        type: String
    },
    Category:{
        type: String
    }
})

module.exports = mongoose.model('Dates',DateSchema)