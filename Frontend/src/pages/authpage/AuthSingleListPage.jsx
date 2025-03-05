import React, { useEffect, useState } from 'react'
import { authLike, authPageView, authSingleBlogPage, authUnLike } from '../../services/blogServices'
import { useParams } from 'react-router-dom'
import SingleListCard from '../../components/rootComponents/SingleListCard'
import useAuthStore from '../../store/authStore'

const AuthSingleListPage = () => {
  
  const [fetchData,setFetchData] = useState({})
  const [loading,setLoading] = useState(false)
  const [loadMore,setLoadMore] = useState(true)
  
  const [likedBlog,setLikedBlog] = useState({})
  const [userClick,setUserClick] = useState(false)

  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
  const dateConvert = (item) => {
    const date = new Date(item)

    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
        return formattedDate
    }

  let blogId = useParams()
  
  //  fetch single page data
  const fetchSingleBlog = async () => {

    try {
        loading === null ? "" :  setLoading(true)
      const res = await authSingleBlogPage(blogId.id)
      setLikedBlog(res.getLike)
      setFetchData(res?.data)
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

  
   { loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p>  : <SingleListCard userClick={userClick} likedBlog={likedBlog} unLike={unLike} addLike={addLike}   fetchData={fetchData} fetchSingleBlog={fetchSingleBlog}  loadMore={loadMore} dateConvert={dateConvert} blogId={blogId} />}
   </div>
  )
}

export default AuthSingleListPage