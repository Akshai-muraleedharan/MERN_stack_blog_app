import React, { useEffect, useState } from 'react'
import Hero from '../../components/rootComponents/Hero'
import BlogCard from '../../components/rootComponents/BlogCard'
import { fetchBlogData, mostViewBlog } from '../../services/blogServices'
import useAuthStore from '../../store/authStore'
import Cookies from 'js-cookie';

const Home = () => {
  const [dataFetch, setFetchData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [mostView, setMostView] = useState([])

  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
  const limit = 2

  const fetchData = async () => {
    try {
      const res = await fetchBlogData(page, limit)
      if (res?.data.length === 0) {
        setHasMore(false)
      }
      setFetchData((prevItems) => [...prevItems, ...res?.data])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.log(error)
      setHasMore(false)
    }
  }

  const fetchMostViewBlog = async () => {
    try {
      const response = await mostViewBlog()
      setMostView(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    fetchMostViewBlog()
    const getCookie = Cookies.get('token')
    if (getCookie === undefined) {
      SetUserNoToken(null)
    }
  }, [])

  return (
    <div >
      <Hero />
      <div className='px-5 dark:bg-dark-bg  md:px-10 lg:px-32 w-full mb-5 bg-primary_bg'>
        <BlogCard mostView={mostView} dataFetch={dataFetch} hasMore={hasMore} fetchData={fetchData} />
      </div>
    </div>
  )
}

export default Home