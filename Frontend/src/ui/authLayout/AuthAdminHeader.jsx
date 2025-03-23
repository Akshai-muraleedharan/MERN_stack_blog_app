import React from 'react'
import { Link} from 'react-router-dom'
import DarkModeButton from '../commonLayout/DarkModeButton'


const AuthAdminHeader = () => {
       
       
  return (
    <div className="navbar dark:bg-dark-bg bg-base-100 shadow-sm px-5">
    
         <div className="flex-1">
                <Link to={"/admin"} className="btn btn-ghost btn-sm dark:text-white text-black pl-0 md:text-lg text-md">Dev_Blogs</Link>
         </div>

            <div className="flex gap-3 md:gap-10 md:flex-row-reverse items-center">
           
                <p className='text-[12px] dark:text-white text-black md:text-md'>Welcome, admin</p>
                <DarkModeButton />

                                 
            </div>

  </div>
  )
}

export default AuthAdminHeader