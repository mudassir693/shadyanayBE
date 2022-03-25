const router = require('express').Router();
const { verifyAdmin, verifyUser } = require('../middleware/auth');
const Hall = require('../Models/Hall');


// @route /halls/getAll
// @desc Get halls
// @access Admin
router.get('/getAll',verifyAdmin,async(req,res)=>{
    try {
        const respHalls = await Hall.find()
        return res.status(200).json({data:respHalls,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /halls/get/:id
// @desc Get hall
// @access Admin
router.get('/get/:id',verifyUser,async(req,res)=>{
    try {
        const respHalls = await Hall.findById(req.params.id)
        return res.status(200).json({data:respHalls,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /halls/update/:id
// @desc Update hall
// @access Admin

router.put('/update/:id',verifyUser,async(req,res)=>{
    try {
        const {Title,PhoneNumber,...others} = req.body
        
        if(req.body.Location){
            req.body.Location = req.body.Location.toUpperCase()
        }
        const respHalls = await Hall.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(200).json({data:respHalls,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /halls/update/:id
// @desc Update hall
// @access Admin

router.delete('/delete/:id',verifyAdmin,async(req,res)=>{
    try {
        const respHalls = await Hall.findByIdAndRemove(req.params.id)
        return res.status(200).json({data:respHalls,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})



// @route /halls/getByTyping/:word
// @desc Update hall
// @access Admin
router.get('/getByTyping/:word',async(req,res)=>{
    try {
        const respHalls = await Hall.find({Location: {"$regex":`${(req.params.word).toUpperCase()}` }})
        return res.status(200).json({data:respHalls,status:200,error:false}) 
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true}) 
    }
})

// @route /halls/getByBanquet/:value
// @desc get All Banquet
// @access Admin

router.get('/getByBanquet/:value',async(req,res)=>{
    try {
        const {data} = req.body
        let resp=[]
        const value = req.params.value
        if(value=='true'){
            // resp = await Hall.find({Banquet:true})
            data.forEach(eachData=>{
                if(eachData.Banquet==true){
                    resp.push(eachData)
                }
            }) 
        }else{
            // resp = await Hall.find({Banquet:false})
            
            data.forEach(eachData=>{
                if(eachData.Banquet==false){
                    resp.push(eachData)
                }
            }) 
        }

        return res.status(200).json({data:resp,status:200,error:false})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,status:500,error:true})
    }
})



router.get('/getByParking/:value',async(req,res)=>{
    try {
        const {data} = req.body
        let resp=[]
        const value = req.params.value
        if(value==='true'){
            // resp = await Hall.find({Parking:true})
            data.forEach(eachData=>{
                if(eachData.Parking==true){
                    resp.push(eachData)
                }
            }) 
        }else{
            // resp = await Hall.find({Parking:false})
            data.forEach(eachData=>{
                console.log('Hello');
                if(!eachData.Parking){
                    resp.push(eachData)
                }
            }) 
        }

        return res.status(200).json({data:resp,status:200,error:false})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:error,status:500,error:true})
    }
})
module.exports = router