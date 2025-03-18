import React from 'react'
import DashBoardTop from '../../components/adminComponents/dashboard/DashBoardTop'




const AdminHomePage = () => {


  return (
  <div className='px-5 dark:bg-black  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>

    <DashBoardTop />

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