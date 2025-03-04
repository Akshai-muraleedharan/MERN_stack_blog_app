import jwt from "jsonwebtoken"


  export const checkUser = async (req,res,next) => {
    try {
        const {token} = req.cookies

        
        if(!token){
            return res.status(400).json({success:false,message:"no token"})
        }

        jwt.verify(token,process.env.JWTSECRECT,(err,decoded) => {     

            if(err){
                return res.status(400).json({success:false,message:err.message})
            }else{
                return  req.userId = decoded
            }
        })
  
        next()
    } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
    }
  }