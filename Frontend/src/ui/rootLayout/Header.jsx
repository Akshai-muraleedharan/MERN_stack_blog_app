import React from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
  return (
    <div className="navbar  bg-base-100 shadow-sm px-5">
    
    <div className="flex-1">
      <Link to={"/"} className="btn btn-ghost pl-0 text-xl">Dev_Blogs</Link>
    </div>

    <div className="flex-none ">

      <button className="btn  btn-neutral  btn-sm md:btn-md">
       Login
      </button>
    </div>

    
   
  </div>
  )
}

export default Header