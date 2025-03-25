  import React, { useEffect, useState } from 'react'
  import { authCommentBlog, authCommentDelete, authCommentUpdate, authLike, authPageView, authSingleBlogPage, authUnLike } from '../../services/blogServices'
  import { useParams } from 'react-router-dom'
  import SingleListCard from '../../components/rootComponents/SingleListCard'
  import useAuthStore from '../../store/authStore'
  import DOMpurify from'dompurify'

  const AuthSingleListPage = () => { 
  const [fetchData,setFetchData] = useState({})
  const [loading,setLoading] = useState(true)
  const [buttonLoading,setButtonLoading] = useState(false)
  const [LikeButtonLoading,setLikeButtonLoading] = useState(false)
  const [unLikeButtonLoading,setUnLikeButtonLoading] = useState(false)
  const [commentDeleteLoading,setcommentDeleteLoading] = useState(false)
  const [commentEditLoading,setcommentEditLoading] = useState(false)
  const [loadMore,setLoadMore] = useState(true)
  const [checkComment,setCheckComment] = useState([])
  const [likedBlog,setLikedBlog] = useState({})
  const [userClick,setUserClick] = useState(false)
  const [commentBox,setCommentBox] = useState(false)
  const [commentForUpdate,setCommentForUpdate] = useState(null)
  const [sanitizedContent,setSanitizedContent] = useState("")

  let blogId = useParams()
  const {user} = useAuthStore()
  
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
      const sanitized = DOMpurify.sanitize(res?.data?.content)
      setSanitizedContent(sanitized)
      const sortData = res?.data?.comments?.sort((a,b) => (a.userId === user.userId ? -1 : 1))
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
        setLikeButtonLoading(true)
        await authLike(blogId.id)        
        setUserClick(true)
        fetchSingleBlog()
        setLikeButtonLoading(false)            
         } catch (error) {
          console.log(error)
          setLikeButtonLoading(false)
          if(error?.response?.data.message === "no token"){
            SetUserNoToken(null)
          }
         }
      }

      const unLike = async () => {
        try {
          setUnLikeButtonLoading(true)
          await authUnLike(blogId.id)        
          setUserClick(false)
          fetchSingleBlog()
          setUnLikeButtonLoading(false)
        } catch (error) {
         console.log(error)
         setUnLikeButtonLoading(false)
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
        setButtonLoading(true)
        await authCommentBlog(blogId.id,data)
        fetchSingleBlog()
        setCommentBox(false)
        setButtonLoading(false)
       } catch (error) {
        console.log(error)
        setButtonLoading(false)
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
            setcommentEditLoading(true)
            await authCommentUpdate(id,data)
            fetchSingleBlog()
            setCommentBox(false)
            setcommentEditLoading(false)
          } catch (error) {
            console.log(error)
            setcommentEditLoading(false)
            if(error?.response?.data.message === "no token"){
              SetUserNoToken(null)
            }
          }
     } 

     const userDeleteComment = async (id) => {
         try{
          setcommentDeleteLoading(true)
          await authCommentDelete(id)
          fetchSingleBlog()
          setCommentBox(false)
          setcommentDeleteLoading(false)
         }catch(error){
          console.log(error)
          setcommentDeleteLoading(false)
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
    <div className="lg:px-32 md:px-10 px-5">
   { loading === true ? <p className='flex justify-center mt-4'><span className="loading loading-md loading-spinner"></span></p>  : <SingleListCard commentEditLoading={commentEditLoading} commentDeleteLoading={commentDeleteLoading} unLikeButtonLoading={unLikeButtonLoading} LikeButtonLoading={LikeButtonLoading}  sanitizedContent={sanitizedContent} buttonLoading={buttonLoading} loading={loading} userDeleteComment={userDeleteComment} userUpdateComment={userUpdateComment} postComment={postComment} commentForUpdate={commentForUpdate} setCommentBox={setCommentBox} commentBox={commentBox} checkComment={checkComment} userClick={userClick} likedBlog={likedBlog} unLike={unLike} addLike={addLike} addComment={addComment}   fetchData={fetchData} fetchSingleBlog={fetchSingleBlog}  loadMore={loadMore} dateConvert={dateConvert} blogId={blogId} updateComment={updateComment} setCommentForUpdate={setCommentForUpdate} />}
    </div>
    )
  }

 export default AuthSingleListPage