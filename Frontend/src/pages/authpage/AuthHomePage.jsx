import React, { useEffect, useState } from 'react'
import Hero from '../../components/rootComponents/Hero'
import { authFetchBlogData, authMostViewBlog } from '../../services/blogServices'
import useAuthStore from '../../store/authStore'
import BlogCard from '../../components/rootComponents/BlogCard'


const AuthHomePage = () => {
  const [dataFetch, setFetchData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [mostView, setMostView] = useState([])
  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)

  const fetchData = async () => {
    try {
      const limit = 2
      const res = await authFetchBlogData(page, limit)
      if (res?.data.length === 0) {
        setHasMore(false)
      }
      setFetchData((prevItems) => [...prevItems, ...res?.data])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.log(error)
      if (error?.response?.data.message === "no token") {
        SetUserNoToken(null)
      }
    }
  }
  const authFetchMostViewBlog = async () => {
    try {
      const response = await authMostViewBlog()
      setMostView(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    authFetchMostViewBlog()
  }, [])

  return (
    <div>
      <Hero />
      <div className='px-5 md:px-10 lg:px-32 dark:bg-dark-bg  w-full mb-5 bg-primary_bg'>
        <BlogCard mostView={mostView} dataFetch={dataFetch} hasMore={hasMore} fetchData={fetchData} />
      </div>
    </div>
  )
}

export default AuthHomePage