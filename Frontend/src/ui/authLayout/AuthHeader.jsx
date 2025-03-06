import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { FaBars } from "react-icons/fa6";

const AuthHeader = () => {

  const {user} =useAuthStore();

  return (
  
    <div className="navbar  bg-base-100 shadow-sm px-5">
    
         <div className="flex-1">
                <Link to={"/blog"} className="btn btn-ghost pl-0 text-xl">Dev_Blogs</Link>
         </div>

            <div className="flex gap-4 items-center">

                <p className='text-[14px] font-semibold md:text-md'>{`Welcome, ${user.username}`}</p>


                                  <div className=" md:hidden dropdown dropdown-end">
                                    <div tabIndex={0} role="button" > <FaBars className='text-[23px]'/> </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box mt-1 z-1 w-52 p-2 shadow-sm">
                                      <li><a>Item 1</a></li>
                                      <li><a>Item 2</a></li>
                                    </ul>
                                  </div>

                                  <ul className='hidden md:flex gap-5'>
                                   <NavLink to={"create-blog"}><li className='text-[14px] font-semibold hover:text-gray-500 md:text-md cursor-pointer'>Create Blog</li></NavLink> 
                                    <li className='text-[14px] font-semibold hover:text-gray-500 md:text-md cursor-pointer'>Profile</li>
                                  </ul>
            </div>

  </div>

  )
}

export default AuthHeader