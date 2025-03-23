import React, { useEffect, useState } from 'react'
import DashBoardTop from '../../components/adminComponents/dashboard/DashBoardTop'
import { approvedBlogs, totalBlogs, totaluser } from '../../services/adminSevices'
import useAdminAuthStore from '../../store/adminStore'
import DashBoardMostViewBlog from '../../components/adminComponents/dashboard/DashBoardMostViewBlog'




const AdminHomePage = () => {

  const [BlogsTotal,setBlogsTotal] = useState(0)
  const [userTotal,setUserTotal] = useState(0)
  const [approvedBlog,setApprovedBlogs] = useState(0)
  const [loading,setLoading] = useState(true)
  
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

   
 

  useEffect(() => {
    fetchTotalBlogs()
    fetchTotalUser()
    fetchApprovedBlogs()
   
  },[])


  return (
  <div className='px-5 dark:bg-dark-bg  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>

{loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p> : <DashBoardTop approvedBlog={approvedBlog} userTotal={userTotal} loading={loading} BlogsTotal={BlogsTotal} /> }
    

<DashBoardMostViewBlog />
  </div>
  )
}

export default AdminHomePage