import LikeModel from "../../model/blogLikeModel.js"
import blogModel from "../../model/blogModel.js"
import UserModel from "../../model/userModel.js"
import { cloudineryInstance } from "../../config/cloudinaryConfig.js";


  export const blogCount = async (req,res) => {

   try {
    const totalBlog = await blogModel.countDocuments()

    res.status(200).json({success:true,message:"fetched",data:totalBlog})
   } catch (error) {
      return res.status(error.status || 400).json(error.message || "internal server error")
   }

  }



  export const userCount = async (req,res) => {

   try {
    const totalBlog = await UserModel.countDocuments()

    res.status(200).json({success:true,message:"fetched",data:totalBlog})
   } catch (error) {
      return res.status(error.status || 400).json(error.message || "internal server error")
   }

  }


  export const approvedBlogs = async (req,res) => {

   try {
    const totalBlog = await blogModel.countDocuments({published:true})


    res.status(200).json({success:true,message:"fetched",data:totalBlog})
   } catch (error) {
      return res.status(error.status || 400).json(error.message || "internal server error")
   }

  }


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


  
   export const adminDeleteBlog = async (req,res) => {
         try {
          const {blogId} = req.params
  
        const blog = await blogModel.findByIdAndDelete(blogId)
  
         await  cloudineryInstance.uploader.destroy(blog.imageId).catch((error) => {
          return res.status(400).json({success:false,message:error})
        })
       
        res.status(200).json({success:true,message:"deleted successfully"})
         } catch (error) {
          return res.status(error.status || 400).json(error.message || "internal server error")
         }
      }