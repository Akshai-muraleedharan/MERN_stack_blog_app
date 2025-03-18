import express from 'express'
import {  AdminLogin, configTest } from '../../../controller/admin/adminController.js'
import { checkadmin } from '../../../middleware/adminAuth.js'
import { blogCount } from '../../../controller/admin/adminBlogController.js'


const adminRoute = express.Router()

adminRoute.post('/login',AdminLogin)


adminRoute.get('/test',checkadmin,configTest)
adminRoute.get('/blog/total',checkadmin,blogCount)

export default adminRoute
