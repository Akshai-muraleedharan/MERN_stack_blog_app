import { cloudineryInstance } from "../../config/cloudinaryConfig.js";
import blogModel from "../../model/blogModel.js";
import blogSchemaValidation from "../../utils/blogJoiValid.js";



     export const createBlog = async (req,res) => {

      const {error,value} = blogSchemaValidation.validate(req.body)
         
      if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
      }
        try {

            const {title,content,category} = value;
            const {userId} = req.userId;
            const file = req.file;

            if(!userId){
              return res.status(400).json({success:false,message:"no user id"})
            }

            if(!file){
              return res.status(400).json({success:false,message:"image file not get"})
            }

          const uploadResult = await  cloudineryInstance.uploader.upload(file.path,{ folder: "Mern Blog/Blog Images" }).catch((error)=>{
            return res.status(400).json({success:false,message:error})
          }) 

          const categToLowerCase = category.toLowerCase();

            const blog =  new blogModel({
                title,
                content,
                author:userId,
                image:uploadResult.secure_url,
                imageId:uploadResult.public_id,
                category:categToLowerCase
            })

           const savedBlog =   await blog.save()

            res.status(200).json({success:true,message:"blog create successfully",data:savedBlog})
            
        } catch (error) {
             return res.status(error.status || 400).json(error.message || "internal server error")
        }
    }

    export const addLike = async (req,res) => {
         try {
          const {blogId} = req.params

          await blogModel.findByIdAndUpdate(blogId,{$inc: {likes : 1}},{new : true})

          res.status(200).json({success:true,message:"like added"})
         } catch (error) {
          return res.status(error.status || 400).json(error.message || "internal server error")
         }
    }


    export const deleteBlog = async (req,res) => {
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

    export const viewCount = async(req,res) => {
      try {
          const {blogId} = req.params

          await blogModel.findByIdAndUpdate(blogId,{
            $inc:{view : 1}
          },{new:true})

          res.status(200).json({success:true,message:"view success"})
      } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
    }

    export const blogData = async (req,res) => {
        try {
          
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 6

      const skip = (page - 1) * limit

      const blogs = await blogModel.find({}).skip(skip).limit(limit)

      if(!blogs){
        return res.status(400).json({success:false,message:"no data found"})
      }

      res.status(200).json({success:true,message:"data fetched successfully",data:blogs,page,limit,hasMore: blogs.length === limit})
        } catch (error) {
          return res.status(error.status || 400).json(error.message || "internal server error")
        }
    }

    export const singleBlogData = async (req,res) => {

      try {

        const {blogId} = req.params
        
            if(!blogId){
              return res.status(400).json({success:false,message:"blog Id not get"})
            }

        const fetchBlog = await blogModel.findById(blogId).populate("author",'-password').populate("comments")

        res.status(200).json({success:true,message:"data fetched",data:fetchBlog})

      } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
    }