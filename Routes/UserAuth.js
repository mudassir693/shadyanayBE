const router = require('express').Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { json } = require('express/lib/response')

// @route /userAuth/register
// @description Add user
// @access All

router.post('/register',async(req,res)=>{
    try {
        const {PhoneNumber,Name,Address} = req.body

        const isUserAlreadyRegister = await User.findOne({PhoneNumber})
        if(isUserAlreadyRegister){
            return res.status(400).json({data:"User with this contact info already registered",status:400,error:true})
        } 

        const newUser = new User({
            Name:Name.toUpperCase(),
            PhoneNumber,
            Address
        })

        const resp = await newUser.save()
        return res.status(200).json({data:resp,status:200,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true})
    }
})


// @route /userAuth/login
// @description login user
// @access All

router.post('/login',async (req,res)=>{
    try {
        const {PhoneNumber} = req.body
        const resp = await User.findOne({PhoneNumber})
        if(!resp){
            return res.status(400).json({data:"This Phone Numver is not register",status:400,error:true})
        }

        const token = jwt.sign({
            userId:resp._id,
            category:"user",
            role:''
        },process.env.JWT_Token,{expiresIn:'7d'})
        
        return res.status(200).json({data:{resp,token},status:200,error:false})

    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,status:500,error:true})
        
    }
})
module.exports = router