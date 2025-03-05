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

          const token =  jwt.sign({userId:userData._id,},process.env.JWTSECRECT);
          
  
          res.cookie("token",token,{
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production', 
              maxAge: 60 * 60 * 1000, 
              sameSite: 'Strict',
          }) 

        res.status(201).json({success:true, message:"user created successfully",data:userData.username})
          
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

        const accountExist = await UserModel.findOne({email:email}).select(["-password","-email","-createdAt","-updatedAt","-isAdmin"])

        if(!accountExist){
          return res.status(400).json({success:false,message:"Account not exist"})
        }

        const checkPassword = await UserModel.findOne({email:email})

        const comaprePassword = await bcryptjs.compare(password,checkPassword.password)


        if(!comaprePassword){
          return res.status(400).json({success:false,message:"invalid credentials"})
        }

        const token =  jwt.sign({userId:accountExist._id,},process.env.JWTSECRECT);
          
  
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

      

          res.status(200).json({success:true,message:"data upload successfully",email,password})
        } catch (error) {
          return res.status(error.status || 400).json(error.message || "internal server error")
        }
      }


      export const GoogleAuth = async (req,res) => {
         try{
          const { email , username } = req.body

          const user = await UserModel.findOne({email:email})

          if(user){

            const token =  jwt.sign({userId:user._id,},process.env.JWTSECRECT);
          
  
          res.cookie("token",token,{
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production', 
              maxAge: 60 * 60 * 1000, 
              sameSite: 'Strict',
          }) 

          res.status(200).json({success:true,message:"logged",data:user.username})

          }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) 
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(generatedPassword,salt)

            const getFirstName = username.split(" ")


           const newUser = new UserModel({
                 username:getFirstName[0].toLowerCase(),
                 password:hashedPassword,
                 email
           })

              await newUser.save()

              res.status(201).json({success:true, message:"user created successfully",data:newUser.username})
          }

          
          
         }catch(error){
            console.log(error);
            
         }
      }

      