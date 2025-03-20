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
        default:"https://images.unsplash.com/photo-1517503733723-8ea1cf616798?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGluZ3xlbnwwfHwwfHx8MA%3D%3D",
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
     comments:[{type:mongoose.Schema.Types.ObjectId, ref:"Comment"}],

     likes:{
      type:Number,
      default:0
     },
     
     imageId:{
      type:String,
      default:""
     },
     view:{
      type:Number,
      default:0
     },
     category:{
      type:String,
      required:true
     }
  })

  const blogModel = mongoose.model("Blog",blogSchema);

  export default blogModel