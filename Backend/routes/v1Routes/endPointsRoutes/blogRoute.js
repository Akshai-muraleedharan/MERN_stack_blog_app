import express from "express"
import { addLike, blogData, createBlog, deleteBlog, singleBlogData, viewCount } from "../../../controller/Blog/blogController.js"
import { checkUser } from "../../../middleware/userAuth.js"
import { createComment } from "../../../controller/Blog/commentController.js"
import { upload } from "../../../middleware/multer.js"


const blogRoute = express.Router()

  blogRoute.post('/create',upload.single("image"),checkUser,createBlog)
  blogRoute.post('/comment/:blogId',checkUser,createComment)
  blogRoute.put('/like/:blogId',checkUser,addLike)
  blogRoute.delete('/delete/:blogId',checkUser,deleteBlog)
  blogRoute.put('/view/:blogId',viewCount)
  blogRoute.get('/data',blogData)
  blogRoute.get('/data/:blogId',singleBlogData)


 export default blogRoute