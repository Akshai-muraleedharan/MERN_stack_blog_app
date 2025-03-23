import express from 'express'
import {  AdminLogin, configTest } from '../../../controller/admin/adminController.js'
import { checkadmin } from '../../../middleware/adminAuth.js'
import { adminAuthSingleBlogData, adminblogApproval, adminblogNotApproval, adminDeleteBlog, approvedBlogs, blogCount,  getBlogs,  userCount } from '../../../controller/admin/adminBlogController.js'
import { adminDeleteUser, getUser } from '../../../controller/admin/adminUserController.js'
import { adminDeleteComment } from '../../../controller/admin/adminBlogCommentController.js'



const adminRoute = express.Router()

adminRoute.post('/login',AdminLogin)

adminRoute.get('/total/blog',checkadmin,blogCount)
adminRoute.get('/total/user',checkadmin,userCount)
adminRoute.get('/single-blog/:blogId',checkadmin,adminAuthSingleBlogData)
adminRoute.get('/approved/blogs',checkadmin,approvedBlogs)
adminRoute.delete('/blogs/:blogId',checkadmin,adminDeleteBlog)
adminRoute.delete('/comment/:commentId',checkadmin,adminDeleteComment)
adminRoute.delete('/user/delete/:userId',checkadmin,adminDeleteUser)


adminRoute.put('/blog-approval/:blogId',adminblogApproval)
adminRoute.put('/blog/not-approval/:blogId',adminblogNotApproval)


adminRoute.get('/test',checkadmin,configTest)

// pagination
adminRoute.get('/users/page',checkadmin,getUser)
adminRoute.get('/blogs/page',checkadmin,getBlogs)

export default adminRoute
