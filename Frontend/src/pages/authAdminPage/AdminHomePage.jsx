import React, { useEffect, useState } from 'react'
import DashBoardTop from '../../components/adminComponents/dashboard/DashBoardTop'
import { approvedBlogs, productionTest, totalBlogs, totaluser } from '../../services/adminSevices'
import useAdminAuthStore from '../../store/adminStore'




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

     const testProduction = async () => {
          try {
              const res = await productionTest()

              console.log(res)
          } catch (error) {
            console.log(error)
          }
     }
 

  useEffect(() => {
    fetchTotalBlogs()
    fetchTotalUser()
    fetchApprovedBlogs()
    testProduction()
  },[])


  return (
  <div className='px-5 dark:bg-black  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>

{loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-md"></span></p> : <DashBoardTop approvedBlog={approvedBlog} userTotal={userTotal} loading={loading} BlogsTotal={BlogsTotal} /> }
    

<div className="stats stats-vertical lg:stats-horizontal shadow">
  <div className="stat">
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat">
    <div className="stat-title">New Users</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>

  <div className="stat">
    <div className="stat-title">New Registers</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
  </div>
  )
}

export default AdminHomePage