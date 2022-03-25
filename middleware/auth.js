const jwt = require('jsonwebtoken')

const AuthUser = (req,res,next)=>{
    try {
        const auth = req.headers.token
        if(auth){
            const token = auth.split(' ')[1]
            jwt.verify(token,process.env.JWT_Token,(error,data)=>{
                if(error){
                    return res.status(403).json({data:"invalid token",status:403,error:true})
                }
                req.user = data
                next()
            }) 
        }else{
            return res.status(403).json({data:"token require",status:403,error:true})
        }
    } catch (error) {
        return res.status(500).json({data:error,status:500,error:true})
    }
}

const verifyUser = (req,res,next)=>{
    AuthUser(req,res,()=>{
        // console.log(req.user)
        if(req.user.userId==req.params.id ||  req.user.role=="Admin" ){
            return next()
        }else{
            return res.status(403).json({data:"You are not allow to do that",status:400, error:true})
        }
    })
}

const verifyAdmin = (req,res,next)=>{
    AuthUser(req,res,()=>{
        // console.log(req.user)
        if(req.user.role=="Admin"){
            return next()
        }else{
            return res.status(403).json({data:"You are not allow to do that",status:400, error:true})
        }
    })
}


module.exports = {AuthUser ,verifyUser, verifyAdmin}