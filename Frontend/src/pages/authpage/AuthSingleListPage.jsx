import React, { useEffect, useState } from 'react'
import { authCommentBlog, authCommentDelete, authCommentUpdate, authLike, authPageView, authSingleBlogPage, authUnLike } from '../../services/blogServices'
import { useParams } from 'react-router-dom'
import SingleListCard from '../../components/rootComponents/SingleListCard'
import useAuthStore from '../../store/authStore'

const AuthSingleListPage = () => {
  
  const [fetchData,setFetchData] = useState({})
  const [loading,setLoading] = useState(true)
  const [loadMore,setLoadMore] = useState(true)
  const [checkComment,setCheckComment] = useState([])
  const [likedBlog,setLikedBlog] = useState({})
  const [userClick,setUserClick] = useState(false)
  const [commentBox,setCommentBox] = useState(false)
  const [commentForUpdate,setCommentForUpdate] = useState(null)
  

  let blogId = useParams()
  const {user} = useAuthStore()
  console.log(user)
  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
  const dateConvert = (item) => {
    const date = new Date(item)

    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
        return formattedDate
    }

  
  
  //  fetch single page data
  const fetchSingleBlog = async () => {

    try {
        loading === null ? "" :  setLoading(true)
      const res = await authSingleBlogPage(blogId.id)
      setLikedBlog(res.getLike)
      setFetchData(res?.data)

      const sortData = res?.data?.comments?.sort((a,b) => (a.userId === user._id ? -1 : 1))

      setCheckComment(sortData)
      setLoading(false)
      setLoading(null)
    } catch (error) {
      console.log(error)
      if(error?.response?.data.message === "no token"){
        SetUserNoToken(null)
      }
      setLoading(false)
      
    }
  }

  
  // add like to blog
  const addLike = async () => {
         try {
            await authLike(blogId.id)        
            setUserClick(true)
            fetchSingleBlog()
            
            
         } catch (error) {
          console.log(error)
          if(error?.response?.data.message === "no token"){
            SetUserNoToken(null)
          }
         }

      }

      const unLike = async () => {
        try {
           await authUnLike(blogId.id)        
           setUserClick(false)
           fetchSingleBlog()
           
        } catch (error) {
         console.log(error)
         if(error?.response?.data.message === "no token"){
           SetUserNoToken(null)
         }
        }

     }


     const addComment = () => {
      setCommentBox(true)
     }

     const postComment =  async (data) => {

       try {
        
        await authCommentBlog(blogId.id,data)
        fetchSingleBlog()
          setCommentBox(false)
        
       } catch (error) {
        console.log(error)
        if(error?.response?.data.message === "no token"){
          SetUserNoToken(null)
        }
       }
     }

    //  to edit function 
     const updateComment = async (id) => {
       const fetch = checkComment.find((item) => item._id === id)
       setCommentForUpdate(fetch)

     }

     const userUpdateComment = async (id,data) => {
          try {
            await authCommentUpdate(id,data)
            fetchSingleBlog()
            setCommentBox(false)
          } catch (error) {
            console.log(error)
            if(error?.response?.data.message === "no token"){
              SetUserNoToken(null)
            }
          }
     } 

     const userDeleteComment = async (id) => {
         try{
         await  authCommentDelete(id)
             fetchSingleBlog()
            setCommentBox(false)
         }catch(error){
          console.log(error)
          if(error?.response?.data.message === "no token"){
            SetUserNoToken(null)
          }
         }
     }



      // page view count function for most view logic 
   const pageViewCount = async () => {
      try {
         await authPageView(blogId.id)
      } catch (error) {
        console.log(error)
        if(error?.response?.data.message === "no token"){
          SetUserNoToken(null)
        }
      }
   }

  useEffect(() => {
     fetchSingleBlog()
     pageViewCount()
     
  },[])

     setTimeout(()=>{ setLoadMore(false)},2000)
  return (
    <div className="px-5 md:px-10 lg:px-32 ">

  
   { loading === true ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p>  : <SingleListCard loading={loading} userDeleteComment={userDeleteComment} userUpdateComment={userUpdateComment} postComment={postComment} commentForUpdate={commentForUpdate} setCommentBox={setCommentBox} commentBox={commentBox} checkComment={checkComment} userClick={userClick} likedBlog={likedBlog} unLike={unLike} addLike={addLike} addComment={addComment}   fetchData={fetchData} fetchSingleBlog={fetchSingleBlog}  loadMore={loadMore} dateConvert={dateConvert} blogId={blogId} updateComment={updateComment} setCommentForUpdate={setCommentForUpdate} />}
   </div>
  )
}

export default AuthSingleListPage