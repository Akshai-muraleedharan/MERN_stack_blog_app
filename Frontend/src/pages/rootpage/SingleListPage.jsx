import React, { useEffect, useState } from 'react'
import { singleBlogPage } from '../../services/blogServices'
import { useParams } from 'react-router-dom'
import SingleListCard from '../../components/rootComponents/SingleListCard';
const SingleListPage = () => {

  const [fetchData,setFetchData] = useState({})
  const [loading,setLoading] = useState(false)
  const [loadMore,setLoadMore] = useState(true)
   
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
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSingleBlog()
  },[])

     setTimeout(()=>{ setLoadMore(false)},2000)

  return (
    <div className="px-5 md:px-10 lg:px-32 ">

     { loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p> : <SingleListCard  fetchData={fetchData}  loadMore={loadMore} dateConvert={dateConvert}/>}
    </div>
  )
}

export default SingleListPage