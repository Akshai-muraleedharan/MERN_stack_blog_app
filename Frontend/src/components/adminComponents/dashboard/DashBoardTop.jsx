import React from 'react'

const DashBoardTop = ({BlogsTotal,userTotal,approvedBlog}) => {


  const date = new Date()

  const getYear = date.getFullYear()
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const month = date.getMonth() + 1
  const monthWord = months[month - 1]

  const getUserPercentage =  userTotal / 100 
  const getApprovedBlogs =  approvedBlog / 100
  
  
  return (
    <div className="stats shadow gap-5 flex my-5 flex-col md:flex-row">
   
    <div className="stat shadow ">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-8 w-8 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div className="stat-title">Total Blogs</div>
      <div className="stat-value">{BlogsTotal}</div>
      <div className="stat-desc">{`${monthWord} ${getYear}`}</div>
    </div>
  
    <div className="stat">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-8 w-8 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
      </div>
      <div className="stat-title">New Users</div>
      <div className="stat-value">{userTotal}</div>
      <div className="stat-desc">({`${getUserPercentage}%`})</div>
    </div>
  
    <div className="stat">
      <div className="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="inline-block h-8 w-8 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      </div>
      <div className="stat-title">Approved blogs</div>
      <div className="stat-value">{approvedBlog}</div>
      <div className="stat-desc">({`${getApprovedBlogs}%`})</div>
    </div>
  </div>
  )
}

export default DashBoardTop