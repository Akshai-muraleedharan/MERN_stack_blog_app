  import React, { useEffect, useState } from 'react'
  import DashBoardTop from '../../components/adminComponents/dashboard/DashBoardTop'
  import { approvedBlogs, authAdminMostViewBlog, totalBlogs, totaluser } from '../../services/adminSevices'
  import useAdminAuthStore from '../../store/adminStore'
  import DashBoardMostViewBlog from '../../components/adminComponents/dashboard/DashBoardMostViewBlog'

  const AdminHomePage = () => {
  const [BlogsTotal,setBlogsTotal] = useState(0)
  const [userTotal,setUserTotal] = useState(0)
  const [approvedBlog,setApprovedBlogs] = useState(0)
  const [mostView,setMostView] = useState([])
  const [loading,setLoading] = useState(true)
  const [viewloading,setViewLoading] = useState(true)
  
  const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)

  const fetchTotalBlogs = async () => {  
    try{ 
      setLoading(true)
      const  res = await totalBlogs()
      setBlogsTotal(res?.data)
      setLoading(false)
      }catch(error){
        setLoading(false)
        console.log(error)
        if(error?.response?.data.message === "no token"){
          SetAdminNoToken(null)
        }
      }
  }

  const fetchTotalUser = async () => {
    try {
     setLoading(true)
     const res = await totaluser()
     setUserTotal(res?.data)
     setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      if(error?.response?.data.message === "no token"){
        SetAdminNoToken(null)
      }
    }
  }

  const fetchApprovedBlogs = async () => {
    try {
     setLoading(true)
     const res = await approvedBlogs()
     setApprovedBlogs(res?.data)
     setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      if(error?.response?.data.message === "no token"){
        SetAdminNoToken(null)
      }
    }
  }

  const fetchMostViewBlog = async () => {
    try {
         setViewLoading(true)
         const res = await authAdminMostViewBlog()
         setMostView(res?.data)
         setViewLoading(false)
    } catch (error) {
      console.log(error)
      setViewLoading(false)
      if(error?.response?.data.message === "no token"){
        SetAdminNoToken(null)
      }
    }
  }

  useEffect(() => {
    fetchTotalBlogs()
    fetchTotalUser()
    fetchApprovedBlogs()
    fetchMostViewBlog()
   
  },[])

  return (
  <div className='px-5 dark:bg-dark-bg  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>
  {loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner dark:bg-dark-spinners-color loading-md"></span></p> : <DashBoardTop approvedBlog={approvedBlog} userTotal={userTotal}  BlogsTotal={BlogsTotal} /> }   
    <div className='mt-10'>
        <h3 className='my-5 dark:text-dark-heads'>Trending Blog</h3>
       { viewloading ? <p className='flex justify-center mt-4'><span className="loading dark:bg-dark-spinners-color loading-spinner loading-md"></span></p> : <DashBoardMostViewBlog mostView={mostView} />}
    </div>
  </div>
  )
}

export default AdminHomePage