import express from 'express'
import {  AdminLogin, configTest } from '../../../controller/admin/adminController.js'
import { checkadmin } from '../../../middleware/adminAuth.js'
import { adminDeleteBlog, approvedBlogs, blogCount, getUser, userCount } from '../../../controller/admin/adminBlogController.js'


const adminRoute = express.Router()

adminRoute.post('/login',AdminLogin)


adminRoute.get('/test',checkadmin,configTest)
adminRoute.get('/total/blog',checkadmin,blogCount)
adminRoute.get('/total/user',checkadmin,userCount)
adminRoute.get('/approved/blogs',checkadmin,approvedBlogs)
adminRoute.delete('/blogs/:blogId',checkadmin,adminDeleteBlog)

// pagination
adminRoute.get('/users/page',checkadmin,getUser)

export default adminRoute
