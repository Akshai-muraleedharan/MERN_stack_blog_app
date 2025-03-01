import blogModel from "../../model/blogModel.js";
import blogSchemaValidation from "../../utils/blogJoiValid.js";



     export const createBlog = async (req,res) => {

      const {error} = blogSchemaValidation.validate(req.body)
         
      if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
      }
        try {
            const {title,content,image} = req.body;
            const {userId} = req.userId;
            
            const blog =  new blogModel({
                title,
                content,
                author:userId,
                image
            })

           const savedBlog =   await blog.save()

            res.status(200).json({success:true,message:"blog create successfully",data:savedBlog})
            
        } catch (error) {
             return res.status(error.status || 400).json(error.message || "internal server error")
        }
    }