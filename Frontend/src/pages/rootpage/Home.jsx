import React, { useEffect, useState } from 'react'
import Hero from '../../components/rootComponents/Hero'
import BlogCard from '../../components/rootComponents/BlogCard'
import { fetchBlogData } from '../../services/blogServices'



const Home = () => {

  const [dataFetch,setFetchData] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [page,setPage] = useState(1)

  const limit = 2

  const fetchData = async () => {
      try {
        const res = await fetchBlogData(page,limit)

        if(res?.data.length === 0) {
          setHasMore(false)
        }

        setFetchData((prevItems) => [...prevItems, ...res?.data])

        setPage((prevPage) => prevPage + 1)
      } catch (error) {
        console.log(error)
        setHasMore(false)
      }
  }

    useEffect(() => {
      fetchData()
    },[])

 
  return (
    <div>
        <Hero />
       <div className='px-5 md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>
       <BlogCard  dataFetch={dataFetch} hasMore={hasMore} fetchData={fetchData}/>  
       </div>
    </div>
  )
}

export default Home