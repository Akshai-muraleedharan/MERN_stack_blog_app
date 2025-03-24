import React, { useState } from 'react'
import {TbUsers} from "react-icons/tb"
import { LuBox } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { authAdminLogOut } from '../../services/adminSevices';
import { RiBloggerFill } from "react-icons/ri";
import useAdminAuthStore from '../../store/adminStore';



function SideBar() {

  const [activeLink,setActiveLink] =useState(0)
  const setadmin = useAdminAuthStore((state) => state.setadmin)
  const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)

  const navigate = useNavigate()

   const logOut = async () =>  {
          try {
              await authAdminLogOut()
              setadmin(null)
              navigate("/admin/login")
  
          } catch (error) {
              console.log(error)
              if(error?.response?.data.message === "no token"){
                SetAdminNoToken(null)
              }
          }
      }

const handleClick = (index) => {
      setActiveLink(index)
}
    const sideBar_link =[
      {id:1, path:'',name:"Dashboard", icon:LuBox},
      {id:2, path:'userlist',name:"Users", icon:TbUsers},
      {id:4, path:'bloglist',name:"Blogs", icon:RiBloggerFill},
      {id:5, path:'user/create',name:"Create User", icon:FaRegUser},
      {id:6, path:'blog/create',name:"Create Blog", icon:IoCreate}
    ]

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 dark:bg-dark-bg bg-white'>


      <ul className='mt-2 space-y-6'>
        {sideBar_link.map((link,index)=> (
          <li key={link.id} className={`font-medium rounded-md py-2 px-5 dark:hover:bg-gray-400  hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-100 text-indigo-500" :""}`}>
            <Link to={link.path} className='flex justify-center md:justify-start items-center  md:space-x-5' onClick={()=> handleClick(index)}>
            <span className='dark:text-dark-texts-color'>{link.icon()}</span>
            <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
            </Link>
          </li>
        ))}
        <li onClick={logOut} className="font-medium cursor-pointer flex justify-center md:justify-start items-center md:space-x-5 rounded-md py-2 px-5 mt-10 hover:bg-indigo-600 hover:text-indigo-500 bg-indigo-500 text-white" >
        <span className='dark:text-dark-texts-color'>{<CiLogout />}</span>
        <span className='text-sm text-white hidden md:flex'>Log Out</span>
        </li>
      </ul>
    </div>
  )
}

export default SideBar