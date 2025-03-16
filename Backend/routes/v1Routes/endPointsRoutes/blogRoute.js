import express from "express"
import { addLike, authBlogData, authMostViewBlog, authSingleBlogData, authViewCount, blogData, createBlog, deleteBlog, mostViewBlog, singleBlogData, unLike, updateBlog, viewCount } from "../../../controller/Blog/blogController.js"
import { checkUser } from "../../../middleware/userAuth.js"
import { createComment, deleteComment, updateComment } from "../../../controller/Blog/commentController.js"
import { upload } from "../../../middleware/multer.js"


const blogRoute = express.Router()
  // protected route
  blogRoute.post('/create',upload.single("image"),checkUser,createBlog)
  blogRoute.put('/update/:blogId',upload.single("image"),checkUser,updateBlog)
  blogRoute.post('/comment/:blogId',checkUser,createComment)
  blogRoute.put('/like/:blogId',checkUser,addLike)
  blogRoute.put('/unlike/:blogId',checkUser,unLike)
  blogRoute.delete('/delete/:blogId',checkUser,deleteBlog)
  blogRoute.get('/auth/blogs',checkUser,authBlogData)
  blogRoute.get('/auth/:blogId',checkUser,authSingleBlogData)
  blogRoute.put('/auth/view/:blogId',checkUser,authViewCount)
  blogRoute.get('/auth/mostview',checkUser,authMostViewBlog)
  blogRoute.put('/auth/update/:commentId',checkUser,updateComment)
  blogRoute.delete('/auth/delete/:commentId',checkUser,deleteComment)

  blogRoute.put('/view/:blogId',viewCount)
  blogRoute.get('/data',blogData)
  blogRoute.get('/mostview',mostViewBlog)
  blogRoute.get('/data/:blogId',singleBlogData)



 export default blogRoute