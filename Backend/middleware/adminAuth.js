import jwt from "jsonwebtoken"


  export const checkadmin = async (req,res,next) => {
    try {
        const {secretToken} = req.cookies

        
        if(!secretToken){
            return res.status(401).json({success:false,message:"no token"})
        }

        jwt.verify(secretToken,process.env.JWTSECRECT,(err,decoded) => {     
         
            if(err){
                return res.status(400).json({success:false,message:err.message})
            }else if(decoded.isAdmin === true) {
                return  req.adminId = decoded
            }
        })
  
        next()
    } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
    }
  }