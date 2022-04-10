const router = require('express').Router()
const { verifyAdmin, verifyUser } = require('../middleware/auth')
const User = require('../Models/User')

// @route /user/getAll
// @desc get all user
// @access Admin
router.get('/getAll',verifyAdmin,async(req,res)=>{
    try {
        const resp = await User.find()
        return res.status(200).json({data:resp,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,error:true}) 
    }
})

// @route /user/getById
// @desc get each User
// Access by User And Admin
router.get('/getById/:id',verifyUser,async (req,res)=>{
    try {
        const resp = await User.findById(req.params.id)
        if(!resp){
            return res.status(400).json({data:'Bad request. No record found',error:true})
        }
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:false})
    }
})


// @route /user/update/:id
// @desc update each User by User
// Access by User
router.put('/update/:id',async(req,res)=>{
    try {
        const {PhoneNumber, ...others} = req.body

        const resp = await User.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        return res.status(500).json({data:error,error:false})
    }
})


// @route /user/updateByAdmin/:id
// @desc update each User by Admin
// Access by Admin
router.put('/updateByAdmin/:id',async(req,res)=>{
    try {
        const {PhoneNumber,...others}= req.body
        
        if(req.body.PhoneNumber){
            const isPhoneNumberRegistered = await User.findOne({PhoneNumber})
            
            if(isPhoneNumberRegistered){
                return res.status(400).json({data:'this contact number is already registered',error:true})
            }
            const resp = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

            return res.status(200).json({data:resp,error:false})
        }
        const user = await User.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(200).json({data:user,error:false})

    } catch (error) {
        return res.status(500).json({data:error,error:true})
    }
})

module.exports = router