import LikeModel from "../../model/blogLikeModel.js"
import blogModel from "../../model/blogModel.js"



  export const blogCount = async (req,res) => {

   try {
    const totalBlog = await blogModel.countDocuments()

    res.status(200).json({success:true,message:"fetched",data:totalBlog})
   } catch (error) {
      console.log(error)
   }

  }