import blogModel from "../../model/blogModel.js";
import commentModel from "../../model/commentModel.js";
import UserModel from "../../model/userModel.js";
import commentSchemaValid from "../../utils/commentJoiValid.js";


 export const createComment = async (req,res) => {

    const {error,value} = commentSchemaValid.validate(req.body)

    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
      }
    try {

        const {userId} = req.userId;
        const {blogId} = req.params
        const {comment} =value
        const userAccount = await UserModel.findById(userId)

       
        if(!blogId){
            return res.status(400).json({success:false,message:"blog id did not get"})
        }

        const newComment = new commentModel({
            username:userAccount.username,
            comment,
            blog:blogId,
            userId:userAccount._id,
            commented:true
        })
        
        await newComment.save()

        const userblog = await blogModel.findById(blogId)

        userblog.comments.unshift(newComment._id)

        await userblog.save()

        res.status(200).json({success:true,message:"comment created", data:newComment})
        
    } catch (error) {
        return res.status(error.status || 400).json(error.message || "internal server error")
    }
 }

 export const updateComment = async (req,res) => {
    const {error,value} = commentSchemaValid.validate(req.body)
    
    if(error){
        return res.status(400).json({success:false,message:error.details[0].message})
      }

       try{

        const {comment} = value;
        const {commentId} = req.params

        await commentModel.findByIdAndUpdate(commentId,{comment:comment},{new:true})
        res.status(200).json({success:true,message:"comment updated successfully"})
      
       }catch(error){
        return res.status(error.status || 400).json(error.message || "internal server error")
       }
 }

   export const deleteComment = async (req,res) => {
      try{
             const {commentId} = req.params;

             const deletedComment = await commentModel.findByIdAndDelete(commentId)

            const blog = await blogModel.findOneAndUpdate({_id:deletedComment.blog},{$pull:{comments:deletedComment._id}},{new:true})
             res.status(200).json({success:true,message:"comment deleted"})
      }catch(error){
        return res.status(error.status || 400).json(error.message || "internal server error")
      }
   }