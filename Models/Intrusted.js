const mongoose = require('mongoose');

const IntrustSchema = new mongoose.Schema({
    UserId: {
        type:String
    },
    HallId: {
        type:String
    }
})

module.exports = mongoose.model('Intrusted',IntrustSchema)