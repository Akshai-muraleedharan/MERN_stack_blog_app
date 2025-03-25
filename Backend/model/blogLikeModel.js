import mongoose from "mongoose"

  const likeSchema = new mongoose.Schema({
       user:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       },
       blog:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
       },
       isLiked:{
        type:Boolean,
        default:false
       }
  })

  const LikeModel = mongoose.model("Like",likeSchema)

  export default LikeModel