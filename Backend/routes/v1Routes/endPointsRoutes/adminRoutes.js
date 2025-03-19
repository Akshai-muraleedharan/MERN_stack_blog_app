import express from 'express'
import {  AdminLogin, configTest } from '../../../controller/admin/adminController.js'
import { checkadmin } from '../../../middleware/adminAuth.js'
import { adminDeleteBlog, approvedBlogs, blogCount, getUser, userCount } from '../../../controller/admin/adminBlogController.js'



const adminRoute = express.Router()

adminRoute.post('/login',AdminLogin)

adminRoute.get('/production-test', async(req,res) => {
     res.status(200).json({success:true,message:"production test success"})
})
adminRoute.get('/test',checkadmin,configTest)
adminRoute.get('/total/blog',blogCount)
adminRoute.get('/total/user',userCount)
adminRoute.get('/approved/blogs',approvedBlogs)
adminRoute.delete('/blogs/:blogId',checkadmin,adminDeleteBlog)

// pagination
adminRoute.get('/users/page',checkadmin,getUser)

export default adminRoute
