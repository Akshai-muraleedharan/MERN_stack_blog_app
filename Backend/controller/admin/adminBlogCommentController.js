import blogModel from "../../model/blogModel.js";
import commentModel from "../../model/commentModel.js";

   export const adminDeleteComment = async (req,res) => {
      try{
             const {commentId} = req.params;
 
             

             const deletedComment = await commentModel.findByIdAndDelete(commentId)
                    console.log(deletedComment)
            const blog = await blogModel.findOneAndUpdate({_id:deletedComment.blog},{$pull:{comments:deletedComment._id}},{new:true})
             res.status(200).json({success:true,message:"comment deleted"})
      }catch(error){
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
   }