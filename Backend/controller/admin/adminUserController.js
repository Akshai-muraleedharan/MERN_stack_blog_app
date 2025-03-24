import UserModel from "../../model/userModel.js"
import { userValidationSchema } from "../../utils/userJoiValid.js"
import bcryptjs from "bcryptjs";

 export const getUser = async (req,res) => {
         try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 8

            const skip = (page - 1) * limit

            const users = await UserModel.find({}).skip(skip).limit(limit).select('-password').populate('postedBlogs')
            const userLength = users.length
            const totalUsers = await UserModel.countDocuments()

            res.status(200).json({success:true,message:"fetched",data:users, currentPage:page , totalPage: Math.ceil(totalUsers / limit) ,totalUsers,userLength})
         } catch (error) {
            return res.status(error.status || 400).json(error.message || "internal server error")
         }
  }


  export const adminDeleteUser = async (req,res) => {
   try {
      const {userId} = req.params      
         await UserModel.findByIdAndDelete(userId)

         res.status(200).json({success:true,message:"User Deleted Successfully"})
   } catch (error) {
      return res.status(error.status || 400).json(error.message || "internal server error")
   }
  }


  
  export const adminUserCreate = async (req,res) => {

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

 
       const userlist = {
          username:userData.username,
          userId:userData._id
       }

     res.status(201).json({success:true, message:"user created successfully",data:userlist})
       
   } catch (error) {
     return res.status(error.status || 400).json(error.message || "internal server error")
   }
}

