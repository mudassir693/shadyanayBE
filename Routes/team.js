const Team = require('../Models/Team')
const router = require('./teamAuth')
const bcrypt = require('bcryptjs')
const {verifyUser} = require('../middleware/auth')

// @route /team/update
// @desc update Team Member
// @access TeamMember itself and Admin
router.put('/update/:id',verifyUser,async(req,res)=>{
    try {
        if(req.body.Password){
            const salt = bcrypt.genSaltSync(12)
            req.body.Password = bcrypt.hashSync(req.body.Password,salt)
        }
        const {Email,...others} = req.body

        // const isAlreadyExist = await Team.findOne({Email})

        // if(!isAlreadyExist){
        //     return res.status(400).json({data:"this user doesn't exist.",status:400,error:false})
        // }

        const resp = await Team.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        
        return res.status(200).json({data:resp,status:200,error:false})
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true})
    }
}) 


// @route /team/delete
// @desc Admin
// @access Admin
router.delete('/delete/:id',async(req,res)=>{
    try {
        const resp = await Team.findById(req.params.id)
        if(!resp){
            return res.status(404).json({data:"No record exist whith this Id",status:404,error:true})
        }

        const resp2 = await Team.findByIdAndDelete(req.params.id)

        return res.status(200).json({data:"secessfully Deleted",status:200,error:false})
    } catch (error) {
        return res.status(404).json({data:"No record exist whith this Id",status:404,error:true})
    }
})
module.exports = router