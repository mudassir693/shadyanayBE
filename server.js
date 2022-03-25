const dotenv = require('dotenv');
const express = require('express')

// dotenv Configured
dotenv.config()

// All local imports
const DB_Connection = require('./config/MongoDB_Config')


const app = express()

DB_Connection().then(()=>{
    console.log("Database Connected Sucessfully...");
}).catch((error)=>{
    console.log(error);
})
// middleConfiguration
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// configuration


app.get('/',(req,res)=>{
    try {
        return res.status(200).json({data:"Welcome to Shadyanay...",error:false,status:200})
    } catch (error) {
        console.log(error);
        return res.status(500).json({data:error,error:true,status:500})
    }
})


// Routes
app.use('/teamsAuth/',require('./Routes/teamAuth'))
app.use('/teams/',require('./Routes/team'))
app.use('/hallsAuth/',require('./Routes/hallsAuth'))
app.use('/halls/',require('./Routes/halls'))
app.use('/catersAuth/',require('./Routes/catersAuth'))
app.use('/caters/',require('./Routes/caters'))
app.use('/usersAuth/',require('./Routes/UserAuth'))

const port = 5000

app.listen(port,()=>{
    console.log(`Shadyanay server running on PORT: 5000`);
})