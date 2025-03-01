    import mongoose from "mongoose"


    const commentSchema = new mongoose.Schema({
        comment:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true
        },
        blog:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        },

        createdAt:{
            type:Date,
            default:Date.now
        },
        updatedAt:{
            type:Date,
            default:Date.now
        }
    })

    const commentModel = mongoose.model('Comment',commentSchema)

    export default commentModel