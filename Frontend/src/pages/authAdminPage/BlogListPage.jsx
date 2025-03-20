import React, { useEffect, useState } from 'react'
import useAdminAuthStore from '../../store/adminStore'
import BlogListTable from '../../components/adminComponents/dashboard/BlogListTable'
import { blogList } from '../../services/adminSevices'
import CommentList from '../../components/adminComponents/dashboard/CommentList'

const BlogListPage = () => {
    const [currentPage,setCurrentPage] = useState(1)
    const [totalData,setTotalData] = useState(0)
    const [totalBlogs ,setTotalBlogs] = useState(0)
    const [blogsData,setBlogData] = useState([])
    const [loading,setLoading] = useState(true)
    const [findOneBlog,setFindOneBlog] = useState([])
    const [openCommentTable,setOpenCommentTable] = useState(false)
    const [findBlog,setFindBlog] = useState({})
     
 
    const limit = 6
   
    const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)
   
    const fetchBlogList = async () => {
          try{
            const res = await blogList(currentPage,limit)
            setBlogData(res?.data)
            setTotalData(totalData + res?.blogLength)
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
   
   
     const previousPage = () => {
       setCurrentPage( currentPage - 1)
       setTotalData(totalData - totalData)
     }
   
     const nextPage = () => setCurrentPage( currentPage + 1)
    
       useEffect(() => {
   
        fetchBlogList()
       
       },[currentPage,])
  return (
    <div className='px-5 dark:bg-black  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>
        <h1 className='text-center text-2xl my-5 dark:text-white'>Blog List</h1> 
        { loading ?  <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p> 
            : <div>
                <BlogListTable blogsData={blogsData} setFindBlog={setFindBlog} setFindOneBlog={setFindOneBlog} setOpenCommentTable={setOpenCommentTable}/> 
        <div className=" mt-5 text-xs flex gap-5 justify-end">
            <button onClick={currentPage === 1 ? null : previousPage}  className={currentPage === 1 ? 'dark:text-white text-gray-300 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Previous </button>
            <button onClick={totalData === totalBlogs ? null : nextPage} className={ totalData === totalBlogs ?  'dark:text-white text-gray-300 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Next</button>
        </div>

          {openCommentTable &&  <CommentList findBlog={findBlog} setFindBlog={setFindBlog} fetchBlogList={fetchBlogList} setOpenCommentTable={setOpenCommentTable} findOneBlog={findOneBlog}/>}
            </div> }

    </div>
  )
}

export default BlogListPage