import { userLoginJoiValid, userValidationSchema } from "../../utils/userJoiValid.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../../model/userModel.js";
import { userProfileJoinValid } from "../../utils/userProfileUpdate.js";





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
              sameSite: 'none',
          }) 

          const userlist = {
             username:userData.username,
             userId:userData._id
          }

        res.status(201).json({success:true, message:"user created successfully",data:userlist})
          
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
              sameSite: 'none',
          }) 

          const userlist = {
            username:accountExist.username,
            userId:accountExist._id,
            
         }


        res.status(200).json({success:true,message:"logged",data:userlist})
        
      } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
  }


  export const userProfileUpdate = async (req,res) => {

    const {error,value} = userProfileJoinValid.validate(req.body)

    if(error){
      return res.status(400).json({success:false,message:error.details[0].message})
  }
      try {
        const {username,email,password} = value;

        const {userId} = req.userId
       if(username === '' || email === ''){
        return res.status(400).json({success:false,message:"email or username is empty"})
       }

      

        const userNameLower = username.toLowerCase()

          await UserModel.findByIdAndUpdate(userId,{
              username:userNameLower,
              email
          },{new:true})

          if(password.length >= 8){
            const salt = await bcryptjs.genSalt(10);
            const hasedPassword = await bcryptjs.hash(password, salt)
             await UserModel.findByIdAndUpdate(userId,{
             password:hasedPassword
          },{new:true})
          }
    

        res.status(200).json({success:true,message:"profile updated",})
        
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

        const user = await UserModel.findById(userId).select("-password").populate("postedBlogs")

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

          const user = await UserModel.findOne({email:email}).select("-password")

          if(user){

            const token =  jwt.sign({userId:user._id,},process.env.JWTSECRECT);
          
  
          res.cookie("token",token,{
              httpOnly: true, 
              secure: process.env.NODE_ENV === 'production', 
              maxAge: 60 * 60 * 1000, 
              sameSite: 'none',
          }) 
          const userlist = {
            username:user.username,
            userId:user._id,
            
         }

          res.status(200).json({success:true,message:"logged",data:userlist})

          }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) 
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(generatedPassword,salt)

            const getFirstName = username.split(" ")


           const newUser = new UserModel({
                 username:getFirstName[0].toLowerCase(),
                 password:hashedPassword,
                 email,
                 isOAuth:true
           })

              await newUser.save()

              const token =  jwt.sign({userId:newUser._id,},process.env.JWTSECRECT);
          
  
              res.cookie("token",token,{
                  httpOnly: true, 
                  secure: process.env.NODE_ENV === 'production', 
                  maxAge: 60 * 60 * 1000, 
                  sameSite: 'none',
              }) 

              const userlist = {
                username:newUser.username,
                userId:newUser._id
             }

              res.status(201).json({success:true, message:"user created successfully",data:userlist})
          }

          
          
         }catch(error){
          return res.status(error.status || 400).json(error.message || "internal server error")
            
         }
      }

      