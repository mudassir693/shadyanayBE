const Team = require('../Models/Team')
const JWT = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const router = require('express').Router()

// @route /user/register
// @desc Register Team Member
// @access category=>Team, role=>Admin

router.post('/register', async(req,res)=>{
try {
    const {Name,Email,Password,PhoneNumber,Role,Image } = req.body;

    const isAlreadyRegister = await Team.findOne({Email})
    if(isAlreadyRegister){
        return res.status(201).json({data:"User With This Email Already Register, Login To Proceed",status:400,error:true})
    }

    const salt = bcrypt.genSaltSync(12)
    const hashedPassword = bcrypt.hashSync(Password,salt)

    const newTeamMember = new Team({
        Name,
        Email,
        Password :hashedPassword,
        PhoneNumber,
        Category:"Team",
        Role,
        Image
    })

    const resp = await newTeamMember.save()
    return res.status(201).json({data:resp,status:201,error:false})
} catch (error) {
    console.log('Team member registration error: ',error);
    return res.status(500).json({data:error,status:500,error:true})
}
})


// @route /user/login
// @desc Login Team Member
// @access All Team Members

router.post('/login',async(req,res)=>{
    try {
        const {Email,Password} = req.body
        const respTeam = await Team.findOne({Email})

        if(!respTeam) {
            return res.status(400).json({data:"You are not registered",status:400,error:true})
        }

        const isPasswordCorrect = bcrypt.compareSync(Password,respTeam.Password)

        if(!isPasswordCorrect){
            return res.status(400).json({data:"Incorrect Password",status:400,error:true})
        }

        const token = JWT.sign({
            userId: respTeam._id,
            category: respTeam.Category,
            role:respTeam.Role
        },
        process.env.JWT_Token,
        {expiresIn:"3d"})

        return res.status(200).json({data:{respTeam,token},status:200,error:false})
    } catch (error) {
        console.log('login error: ',error);
        return res.status(500).json({data:error,status:500,error:true})
    }
})


module.exports = router