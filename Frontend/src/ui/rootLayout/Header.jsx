import React from 'react'
import { Link } from 'react-router-dom'
import DarkModeButton from '../commonLayout/DarkModeButton'
const Header = () => {
  return (
    <div className="navbar dark:bg-dark-bg bg-primary_bg shadow-sm px-5">
      <div className="flex-1">
        <Link to={"/"} className="dark:text-dark-heads pl-0 md:text-xl text-md text-primary-text">Dev_Blogs</Link>
      </div>
      <div className="flex gap-4 md:gap-10  items-center ">
        <DarkModeButton />
        <Link to={"/login"}>
          <button className="btn  btn-neutral  btn-sm md:btn-md">
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header