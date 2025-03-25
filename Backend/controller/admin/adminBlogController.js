
import blogModel from "../../model/blogModel.js"
import UserModel from "../../model/userModel.js"
import { cloudineryInstance } from "../../config/cloudinaryConfig.js";
import blogSchemaValidation from "../../utils/blogJoiValid.js";
import sanitizeContet from "../../middleware/domSanitize.js";


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

  export const getBlogs = async (req , res) => {
   try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 8

      const skip = (page - 1) * limit

      const blogs = await blogModel.find({}).sort({createdAt:-1}).skip(skip).limit(limit).populate("comments").populate("author","-password")
      const blogLength = blogs.length
      const totalBlogs = await blogModel.countDocuments()

      res.status(200).json({success:true,message:"fetched",data:blogs, currentPage:page , totalPage: Math.ceil(totalBlogs / limit) ,totalBlogs,blogLength})
   } catch (error) {
      return res.status(error.status || 400).json(error.message || "internal server error")
   }
}


    export const adminAuthSingleBlogData = async (req,res) => {

      try {
      
        const {blogId} = req.params
        
            if(!blogId){
              return res.status(400).json({success:false,message:"blog Id not get"})
            }

        const fetchBlog = await blogModel.findById(blogId).populate("author",'-password')
        

        
        res.status(200).json({success:true,message:"data fetched",data:fetchBlog ,})

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



      export const adminblogApproval = async (req,res) => {

         try {
         
           const {blogId} = req.params
           
               if(!blogId){
                 return res.status(400).json({success:false,message:"blog Id not get"})
               }
   
           await blogModel.findByIdAndUpdate(blogId,{
            published:true
           },{new:true})          
           res.status(200).json({success:true,message:"Blog Approved"})
   
         } catch (error) {
           return res.status(error.status || 400).json(error.message || "internal server error")
         }
       }

       export const adminblogNotApproval = async (req,res) => {

         try {
         
           const {blogId} = req.params
           
               if(!blogId){
                 return res.status(400).json({success:false,message:"blog Id not get"})
               }
   
           await blogModel.findByIdAndUpdate(blogId,{
            published:false
           },{new:true})          
           res.status(200).json({success:true,message:"Blog Approved Cancel"})
   
         } catch (error) {
           return res.status(error.status || 400).json(error.message || "internal server error")
         }
       }



         export const adminMostViewBlog = async (req,res) => {
             try {
                    const blogs = await blogModel.find({view : {$gt:100}}).sort({view: -1}).populate("author")
       
                    res.status(200).json({success:true,message:"fetched",data:blogs})
             } catch (error) {
               return res.status(error.status || 400).json(error.message || "internal server error" )
             }
           } 


             export const adminCreateBlog = async (req,res) => {
           
                 const {error,value} = blogSchemaValidation.validate(req.body)
                    
                 if(error){
                   return res.status(400).json({success:false,message:error.details[0].message})
                 }
                   try {
           
                       const {title,content,category} = value;
                       const {adminId} = req.adminId;
                       const file = req.file;
           
                       const sanitizeHtml =  sanitizeContet(content)
           
                       if(!adminId){
                         return res.status(400).json({success:false,message:"no admin id"})
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
                           content:sanitizeHtml,
                           author:adminId,
                           image:uploadResult.secure_url,
                           imageId:uploadResult.public_id,
                           category:categToLowerCase
                       })
           
                      const savedBlog =   await blog.save()
           
                      const user = await UserModel.findById(adminId)
           
                       user.postedBlogs.push(savedBlog._id)
           
                      await user.save()
           
                       res.status(200).json({success:true,message:"blog create successfully",data:savedBlog})
                       
                   } catch (error) {
                        return res.status(error.status || 400).json(error.message || "internal server error")
                   }
               }