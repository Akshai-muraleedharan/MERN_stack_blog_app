import React, { useEffect, useState } from 'react'
import useAdminAuthStore from '../../store/adminStore'
import BlogListTable from '../../components/adminComponents/dashboard/BlogListTable'
import { blogDelete, blogList } from '../../services/adminSevices'
import CommentList from '../../components/adminComponents/dashboard/CommentList'
import {toast} from "react-toastify"
const BlogListPage = () => {
    const [currentPage,setCurrentPage] = useState(1)
    const [totalData,setTotalData] = useState(0)
    const [totalBlogs ,setTotalBlogs] = useState(0)
    const [blogsData,setBlogData] = useState([])
    const [loading,setLoading] = useState(true)
    const [findOneBlog,setFindOneBlog] = useState([])
    const [openCommentTable,setOpenCommentTable] = useState(false)
    const [findBlog,setFindBlog] = useState({})
    const [loadingDelete,setDeleteLoading] = useState(false)
   
    const limit = 6
   

    const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)
   
    const fetchBlogList = async (val) => {
          try{
            const res = await blogList(currentPage,limit)
            setBlogData(res?.data)
            val === true ? setTotalData(totalBlogs - 1): setTotalData(totalData + res?.blogLength)
            setTotalBlogs(res?.totalBlogs)
            setLoading(false)
            
          }catch(error){
           console.log(error)
           setLoading(false)
           if(error?.response?.data.message === "no token"){
             SetAdminNoToken(null)
           }
          }
     }
   
     const deleteBlog = async (id) => {
      try {
        setDeleteLoading(true)
           const res = await blogDelete(id)
           const val = true
            fetchBlogList(val)
            if(res.success === true){
              toast.success("Blog Delete Successfully")
            }
            setDeleteLoading(false)
            
  
      } catch (error) {
        console.log(error)
        if(error?.response?.data.message === "no token"){
          SetAdminNoToken(null)
        }
        setDeleteLoading(false)
      }
     } 
   
     const previousPage = () => {
       setCurrentPage( currentPage - 1)
       setTotalData(totalData - totalData)
     }
   
     const nextPage = () => setCurrentPage( currentPage + 1)

    
    
       useEffect(() => {
        fetchBlogList()
       },[currentPage,])
  return (
    <div className='bg-[#f9f9f9] w-full dark:bg-dark-bg lg:px-20 mb-5 md:px-10 px-5'>
        <h1 className='text-2xl text-center dark:text-white my-5'>Blog List</h1> 
        
        { loading ?  <p className='flex justify-center mt-4'><span className="loading dark:bg-dark-spinners-color loading-md loading-spinner"></span></p> 
            : <div>
                <BlogListTable loadingDelete={loadingDelete}  deleteBlog={deleteBlog} blogsData={blogsData} setFindBlog={setFindBlog} setFindOneBlog={setFindOneBlog} setOpenCommentTable={setOpenCommentTable}/> 
        <div className="flex justify-end text-xs gap-5 mt-5">
            <button onClick={currentPage === 1 ? null : previousPage}  className={currentPage === 1 ? 'text-gray-500 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Previous </button>
            <button onClick={totalData === totalBlogs ? null : nextPage} className={ totalData === totalBlogs ?  'text-gray-500 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Next</button>
        </div>

          {openCommentTable &&  <CommentList findBlog={findBlog} setFindBlog={setFindBlog} fetchBlogList={fetchBlogList} setOpenCommentTable={setOpenCommentTable} findOneBlog={findOneBlog}/>}
            </div> }

    </div>
  )
}

export default BlogListPage