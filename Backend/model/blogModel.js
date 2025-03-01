import mongoose from 'mongoose'


  const blogSchema = new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     content:{
        type:String,
        required:true
     },
     image:{
        type:String,
        requried:true
     },
     author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     createdAt:{
        type:Date,
        default:Date.now
     },
     updatedAt:{
        type:Date,
        default:Date.now
     },
     published:{
      type:Boolean,
      default:false
     },
     comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}]
  })

  const blogModel = mongoose.model("Blog",blogSchema);

  export default blogModel