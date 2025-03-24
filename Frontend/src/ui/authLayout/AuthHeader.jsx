import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { FaBars } from "react-icons/fa6";
import DarkModeButton from '../commonLayout/DarkModeButton';

const AuthHeader = () => {

  const {user} =useAuthStore();

  const location = useLocation()
  console.log(location)

  const isActive = (path) => location.pathname === path

  const navLinkClass =({isActive}) => isActive ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' 
  : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  return (
  
    <div className="navbar dark:bg-dark-bg bg-base-100 shadow-sm px-5">
    
         <div className="flex-1">
                <Link to={"/blog"} className="btn btn-ghost dark:text-white text-black pl-0 md:text-xl text-md">Dev_Blogs</Link>
         </div>

            <div className="flex gap-4 md:gap-10 md:flex-row-reverse items-center">
           
                <p className='text-[14px] dark:text-white text-black md:text-md'>{`Welcome, ${user.username}`}</p>
                <DarkModeButton />

                                  <div className=" md:hidden  dropdown dropdown-end">
                                    <div tabIndex={0} role="button" > <FaBars className='text-[23px] dark:bg-black dark:text-white'/> </div>
                                    <ul tabIndex={0} className="dropdown-content dark:bg-gray-400 menu  bg-base-100 rounded-box mt-1 z-1 w-52 p-2 shadow-sm">
                                    <NavLink to={"/blog"}><li  className='text-[14px] dark:text-white mb-4 text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'>Home</li></NavLink> 
                                    <NavLink to={"create-blog"}><li className='text-[14px] dark:text-white mb-4 text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'>Create Blog</li></NavLink> 
                                    <NavLink to={"user-profile"}><li className='text-[14px] dark:text-white mb-4 text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'>Profile</li></NavLink> 
                                    </ul>
                                  </div>

                                  <ul className='hidden md:flex gap-5'>
                                   <NavLink to={"/blog"}><li className={isActive('/blog') ? 'text-primary text-[14px] font-semibold in-dark:text-yellow-400' :'text-[14px] dark:text-white text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'}>Home</li></NavLink> 
                                   <NavLink to={"create-blog"}><li className={isActive('/blog/create-blog') ? 'text-primary text-[14px] font-semibold in-dark:text-yellow-400' : 'text-[14px] dark:text-white text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'}>Create Blog</li></NavLink> 
                                   <NavLink to={"user-profile"}><li className={isActive('/blog/user-profile') ? 'text-primary text-[14px] font-semibold in-dark:text-yellow-400' : 'text-[14px] dark:text-white text-black font-semibold hover:text-gray-500 md:text-md cursor-pointer'}>Profile</li></NavLink> 
                                  </ul>
            </div>

  </div>

  )
}

export default AuthHeader