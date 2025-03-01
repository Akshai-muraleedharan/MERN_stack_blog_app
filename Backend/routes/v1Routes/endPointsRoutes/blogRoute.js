import express from "express"
import { createBlog } from "../../../controller/Blog/blogController.js"
import { checkUser } from "../../../middleware/userAuth.js"
import { createComment } from "../../../controller/Blog/commentController.js"


const blogRoute = express.Router()

  blogRoute.post('/create',checkUser,createBlog)
  blogRoute.post('/comment/:blogId',checkUser,createComment)

 export default blogRoute