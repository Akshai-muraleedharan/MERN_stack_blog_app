import { userLoginJoiValid, userValidationSchema } from "../../utils/userJoiValid.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../model/userModel.js";





export const UserRegister = async (req,res) => {

    try {

      const {error,value} = userValidationSchema.validate(req.body)
 
      if(error){
         return res.status(400).json({success:false,message:error.details[0].message})
      }

        const {username,password,email} = value

        const userExist = await UserModel.findOne({email:email})

        if(userExist){
          return  res.status( 400).json({success:false,message:"Email Already Exist"})
        }

        const userNameLower = username.toLowerCase()
        
        const salt = await bcryptjs.genSalt(10);

        const hasedPassword = await bcryptjs.hash(password, salt)
      
        const userSave = new UserModel({
            username:userNameLower,
            password:hasedPassword,
            email
        })

        const userData = await userSave.save()

        const token =  jwt.sign({userId:userData._id,userEmail:userData.email},process.env.JWTSECRECT);
        
 
        res.cookie("token",token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 60 * 60 * 1000, 
            sameSite: 'Strict',
        }) 

      res.status(200).json({success:true, message:"user created successfully",data:userData.username})
        
    } catch (error) {
       return res.status(error.status || 400).json(error.message || "internal server error")
    }
}

// login

export const userLogin = async (req,res) => {

  const {error,value} = userLoginJoiValid.validate(req.body)

  if(error){
    return res.status(400).json({success:false,message:error.details[0].message})
 }

    try {
      const {email,password} = value;

      const accountExist = await UserModel.findOne({email:email}).select(["-password","-email","-_id","-createdAt","-updatedAt","-isAdmin"])

      if(!accountExist){
        return res.status(400).json({success:false,message:"Account not exist"})
      }

      const checkPassword = await UserModel.findOne({email:email})

      const comaprePassword = await bcryptjs.compare(password,checkPassword.password)


       if(!comaprePassword){
        return res.status(400).json({success:false,message:"invalid credentials"})
      }

       const token =  jwt.sign({userId:accountExist._id,userEmail:accountExist.email},process.env.JWTSECRECT);
        
 
        res.cookie("token",token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 60 * 60 * 1000, 
            sameSite: 'Strict',
        }) 


      res.status(200).json({success:true,message:"logged",data:accountExist.username})
      
    } catch (error) {
       return res.status(error.status || 400).json(error.message || "internal server error")
    }
}


export const userProfile = async (req,res) => {

  try {
     const {userId} = req.userId

     if(!userId){
      return res.status(400).json({success:false,message:"userid is not get"})
     }

     const user = await UserModel.findById(userId).select("-password")

     res.status(200).json({success:true,message:"fetched",userData:user})
  } catch (error) {
    return res.status(error.status || 400).json(error.message || "internal server error")
  }

}

export const userLogOut = async (req,res) => {
  try {
    res.cookie("token","").status(200).json({success:true,message:"user logout successfully "})
  } catch (error) {
    return res.status(error.status || 400).json(error.message || "internal server error")
  }
}


      export const configTest = async (req,res) => {
        try {
          const {email,password} = req.body

          console.log(email)

          res.status(200).json({success:true,message:"data upload successfully",email,password})
        } catch (error) {
          return res.status(error.status || 400).json(error.message || "internal server error")
        }
      }


      