import { cloudineryInstance } from "../../config/cloudinaryConfig.js";
import blogModel from "../../model/blogModel.js";
import blogSchemaValidation from "../../utils/blogJoiValid.js";



     export const createBlog = async (req,res) => {

      const {error} = blogSchemaValidation.validate(req.body)
         
      if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
      }
        try {

            const {title,content} = req.body;
            const {userId} = req.userId;
            const file = req.file;

            if(!file){
              return res.status(400).json({success:false,message:"image file not get"})
            }

          const uploadResult = await  cloudineryInstance.uploader.upload(file.path,{ folder: "Mern Blog/Blog Images" }).catch((error)=>{
            return res.status(400).json({success:false,message:error})
          }) 

          

            const blog =  new blogModel({
                title,
                content,
                author:userId,
                image:uploadResult.secure_url,
                imageId:uploadResult.public_id
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

      const uploadResult = await  cloudineryInstance.uploader.destroy(blog.imageId).catch((error) => {
        return res.status(400).json({success:false,message:error})
      })
     
      res.status(200).json({success:true,message:"deleted successfully"})
       } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
       }
    }