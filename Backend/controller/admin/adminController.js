
import UserModel from "../../model/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userLoginJoiValid } from "../../utils/userJoiValid.js";

export const AdminLogin = async (req,res) => {

    const {error,value} = userLoginJoiValid.validate(req.body)

    if(error){
      return res.status(400).json({success:false,message:error.details[0].message})
  }

      try {
        const {email,password} = value;

        const accountExist = await UserModel.findOne({email:email}).select(["-password","-email","-createdAt","-updatedAt"])

        if(!accountExist){
          return res.status(400).json({success:false,message:"Account not exist"})
        }

        if(!accountExist.isAdmin){ 
            return res.status(400).json({success:false,message:"Invalid account"})
        }

        const checkPassword = await UserModel.findOne({email:email})

        const comaprePassword = await bcryptjs.compare(password,checkPassword.password)


        if(!comaprePassword){
          return res.status(400).json({success:false,message:"invalid credentials"})
        }



        const adminToken =  jwt.sign({adminId:accountExist._id,isAdmin:accountExist.isAdmin},process.env.JWTSECRECT);
          
        
  
          res.cookie("secretToken",adminToken,{
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production', 
              maxAge: 60 * 60 * 1000, 
              sameSite: 'none',
          }) 


        res.status(200).json({success:true,message:"logged",data:accountExist})
        
      } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
  }  


    export const configTest = async (req,res) => {
          try {
            
  
         const {adminId} = req.adminId
     
            res.status(200).json({success:true,message:"data upload successfully",adminId})
          } catch (error) {
            return res.status(error.status || 400).json(error.message || "internal server error")
          }
        }


        
        export const adminLogOut = async (req,res) => {
          try {
            res.cookie("secretToken","").status(200).json({success:true,message:"user logout successfully "})
          } catch (error) {
            return res.status(error.status || 400).json(error.message || "internal server error")
          }
        }