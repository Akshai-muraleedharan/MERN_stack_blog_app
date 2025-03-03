import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { FaBars } from "react-icons/fa6";

const AuthHeader = () => {

  const {user} =useAuthStore();

  return (
  
    <div className="navbar  bg-base-100 shadow-sm px-5">
    
         <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost pl-0 text-xl">Dev_Blogs</Link>
         </div>

            <div className="flex gap-4 items-center">

                <p className='text-[14px] font-semibold md:text-md'>{`Welcome, ${user}`}</p>


                                  <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" > <FaBars className='text-[23px]'/> </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box mt-1 z-1 w-52 p-2 shadow-sm">
                                      <li><a>Item 1</a></li>
                                      <li><a>Item 2</a></li>
                                    </ul>
                                  </div>
            </div>

  </div>

  )
}

export default AuthHeader