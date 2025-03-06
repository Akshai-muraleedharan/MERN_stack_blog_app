import React, { useEffect, useState } from 'react'
import { pageView, singleBlogPage } from '../../services/blogServices'
import { useParams } from 'react-router-dom'
import SingleListCard from '../../components/rootComponents/SingleListCard';
import DOMpurify from'dompurify'
const SingleListPage = () => {

  const [fetchData,setFetchData] = useState({})
  const [loading,setLoading] = useState(true)
  const [loadMore,setLoadMore] = useState(true)
  const [checkComment,setCheckComment] = useState([])
  const [sanitizedContent,setSanitizedContent] = useState("")
  const dateConvert = (item) => {
    const date = new Date(item)

    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
        return formattedDate
  }

  let blogId = useParams()
  
  const fetchSingleBlog = async () => {

    try {
      setLoading(true)
      const res = await singleBlogPage(blogId.id)
      setFetchData(res?.data)
      setCheckComment(res?.data.comments)
      const sanitized = DOMpurify.sanitize(res?.data?.content)
      setSanitizedContent(sanitized)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

   const pageViewCount = async () => {
      try {
         await pageView(blogId.id)
      } catch (error) {
        console.log(error)
      }
   }

  useEffect(() => {
    fetchSingleBlog()
    pageViewCount()
  },[])

     setTimeout(()=>{ setLoadMore(false)},3000)

  return (
    <div className="px-5 md:px-10 lg:px-32 ">

     { loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p> : <SingleListCard sanitizedContent={sanitizedContent} checkComment={checkComment} fetchData={fetchData}  loadMore={loadMore} dateConvert={dateConvert}/>}
    </div>
  )
}

export default SingleListPage