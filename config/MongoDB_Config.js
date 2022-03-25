const mongoose = require('mongoose')


const Connect = async()=>{
    try {
        await mongoose.connect(process.env.MongoURI)
        
    } catch (error) {
        console.log('Connection error: ',error);
    }
}

module.exports = Connect