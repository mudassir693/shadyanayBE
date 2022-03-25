const router = require('express').Router()
const {verifyAdmin} = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const Hall = require('../Models/Hall')

// @route /halls/register
// @desc Add halls
// @access Admin

router.post('/register',async(req,res)=>{
    try {
        const {Name,Title,PhoneNumber,CNIC,Location,Arrangements,Banquet,Parking} = req.body

        const resp1 = await Hall.findOne({Title,PhoneNumber})
        if(resp1){
            return res.status(400).json({data:"user with this info already there",status:400,error:true})
        }

        const newHall = new Hall({
            Name,
            Title,
            PhoneNumber,
            CNIC,
            Location: Location.toUpperCase(),
            Arrangements,
            Banquet,
            Parking
        })
        const resp = await newHall.save()
        return res.status(200).json({data:resp,status:201,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:501,error:true})
    }
})

// @route /halls/login
// @desc login halls
// @access All
router.post('/allHallsWithSamePhoneNumber',async(req,res)=>{
    try {
        const {PhoneNumber} = req.body

        const isHallAvailable = await Hall.find({PhoneNumber})

        if(!isHallAvailable){
            return res.status(400).json({data:"Your Phone Number is not register",status:400,error:true})
        }

        return res.status(200).json({data:isHallAvailable,status:201,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:501,error:true})
    }
})

// @route /halls/login
// @desc login halls
// @access All
router.post('/login',async(req,res)=>{
    try {
        const {PhoneNumber,Title} = req.body

        const isHallAvailable = await Hall.findOne({and:[{PhoneNumber},{Title}]})

        if(!isHallAvailable){
            return res.status(400).json({data:"Your hall is not register",status:400,error:true})
        }

        const token = jwt.sign({
            userId:isHallAvailable._id,
            category:"halls",
            role:''
        },process.env.JWT_Token)

        return res.status(200).json({data:{isHallAvailable,token},status:201,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:501,error:true})
    }
})
module.exports = router