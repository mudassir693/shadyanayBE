const router = require('express').Router();
const { verifyAdmin, verifyUser } = require('../middleware/auth');
const Cater = require('../Models/Caters');


// @route /Caters/getAll
// @desc Get Caters
// @access Admin
router.get('/getAll',verifyAdmin,async(req,res)=>{
    try {
        const respCaters = await Cater.find()
        return res.status(200).json({data:respCaters,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /Caters/get/:id
// @desc Get Cater
// @access Admin
router.get('/get/:id',verifyUser,async(req,res)=>{
    try {
        const respCaters = await Cater.findById(req.params.id)
        return res.status(200).json({data:respCaters,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /Caters/update/:id
// @desc Update Cater
// @access Admin

router.put('/update/:id',verifyUser,async(req,res)=>{
    try {
        const {Title,PhoneNumber,...others} = req.body
        if(req.body.Location){
            req.body.Location = req.body.Location.toUpperCase()
        }
        const respCaters = await Cater.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(200).json({data:respCaters,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /Caters/update/:id
// @desc Update Cater
// @access Admin

router.delete('/delete/:id',verifyAdmin,async(req,res)=>{
    try {
        const respCaters = await Cater.findByIdAndRemove(req.params.id)
        return res.status(200).json({data:respCaters,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})



// @route /Caters/getByTyping/:word
// @desc Update Cater
// @access Admin
router.get('/getByTyping/:word',async(req,res)=>{
    try {
        const respCaters = await Cater.find({Location: {"$regex":`${(req.params.word).toUpperCase()}` }})
        return res.status(200).json({data:respCaters,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

module.exports = router