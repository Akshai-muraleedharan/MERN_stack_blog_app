import UserModel from "../../model/userModel.js"

 export const getUser = async (req,res) => {
         try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 8

            const skip = (page - 1) * limit

            const users = await UserModel.find({}).skip(skip).limit(limit).select('-password').populate('postedBlogs')
            const userLength = users.length
            const totalUsers = await UserModel.countDocuments()

            res.status(200).json({success:true,message:"fetched",data:users, currentPage:page , totalPage: Math.ceil(totalUsers / limit) ,totalUsers,userLength})
         } catch (error) {
            return res.status(error.status || 400).json(error.message || "internal server error")
         }
  }