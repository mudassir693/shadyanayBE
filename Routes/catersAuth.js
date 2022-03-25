const router = require('express').Router()
const {verifyAdmin} = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const Cater = require('../Models/Caters')

// @route /halls/register
// @desc Add halls
// @access Admin

router.post('/register',async(req,res)=>{
    try {
        const {Name,Title,PhoneNumber,CNIC,Location} = req.body

        const resp1 = await Cater.findOne({Title,PhoneNumber,Location:Location.toUpperCase()})
        if(resp1){
            return res.status(400).json({data:"user with this info already there",status:400,error:true})
        }

        const newCater = new Cater({
            Name,
            Title,
            PhoneNumber,
            CNIC,
            Location: Location.toUpperCase(),
        })
        const resp = await newCater.save()
        return res.status(200).json({data:resp,status:201,error:false})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,status:501,error:true})
    }
})

// @route /halls/login
// @desc login halls
// @access All
router.post('/allCatersWithSamePhoneNumber',async(req,res)=>{
    try {
        const {PhoneNumber} = req.body

        const caterAvailable = await Cater.find({PhoneNumber})

        if(!caterAvailable){
            return res.status(400).json({data:"Your Phone Number is not register",status:400,error:true})
        }

        return res.status(200).json({data:caterAvailable,status:201,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:501,error:true})
    }
})

// @route /halls/login
// @desc login halls
// @access All
router.post('/login',async(req,res)=>{
    try {
        const {PhoneNumber,Title, Location} = req.body

        const caterAvailable = await Cater.findOne({and:[{PhoneNumber},{Title},{Location}]})

        if(!caterAvailable){
            return res.status(400).json({data:"Your hall is not register",status:400,error:true})
        }

        const token = jwt.sign({
            userId:caterAvailable._id,
            category:"cater",
            role:''
        },process.env.JWT_Token)

        return res.status(200).json({data:{caterAvailable,token},status:201,error:false})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,status:501,error:true})
    }
})
module.exports = router