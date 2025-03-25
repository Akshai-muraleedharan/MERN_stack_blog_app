import express from 'express'
import {  AdminLogin, adminLogOut, } from '../../../controller/admin/adminController.js'
import { checkadmin } from '../../../middleware/adminAuth.js'
import { adminAuthSingleBlogData, adminblogApproval, adminblogNotApproval, adminCreateBlog, adminDeleteBlog, adminMostViewBlog, approvedBlogs, blogCount,  getBlogs,  userCount } from '../../../controller/admin/adminBlogController.js'
import { adminDeleteUser, adminUserCreate, getUser } from '../../../controller/admin/adminUserController.js'
import { adminDeleteComment } from '../../../controller/admin/adminBlogCommentController.js'
import { upload } from '../../../middleware/multer.js'



const adminRoute = express.Router()

adminRoute.post('/login',AdminLogin)

adminRoute.get('/total/blog',checkadmin,blogCount)
adminRoute.get('/total/user',checkadmin,userCount)
adminRoute.post('/log-out',checkadmin,adminLogOut)
adminRoute.post('/user/create',checkadmin,adminUserCreate)
adminRoute.post('/blog/create',upload.single("image"),checkadmin,adminCreateBlog)
adminRoute.get('/single-blog/:blogId',checkadmin,adminAuthSingleBlogData)
adminRoute.get('/approved/blogs',checkadmin,approvedBlogs)
adminRoute.get('/blogs/views',checkadmin,adminMostViewBlog)
adminRoute.delete('/blogs/:blogId',checkadmin,adminDeleteBlog)
adminRoute.delete('/comment/:commentId',checkadmin,adminDeleteComment)
adminRoute.delete('/user/delete/:userId',checkadmin,adminDeleteUser)


adminRoute.put('/blog-approval/:blogId',checkadmin,adminblogApproval)
adminRoute.put('/blog/not-approval/:blogId',checkadmin,adminblogNotApproval)


// pagination
adminRoute.get('/users/page',checkadmin,getUser)
adminRoute.get('/blogs/page',checkadmin,getBlogs)

export default adminRoute
