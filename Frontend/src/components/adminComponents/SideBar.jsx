import React, { useState } from 'react'
import {TbUsers} from "react-icons/tb"
import { LuBox } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BiCameraMovie } from "react-icons/bi";
import { GiTheater } from "react-icons/gi";



function SideBar() {

  const [activeLink,setActiveLink] =useState(0)

const handleClick = (index) => {
      setActiveLink(index)
}
    const sideBar_link =[
      {id:1, path:'',name:"Dashboard", icon:LuBox},
      {id:2, path:'userlist',name:"Users", icon:TbUsers},
      {id:4, path:'bloglist',name:"Blogs", icon:BiCameraMovie},
      {id:5, path:'theaters',name:"theaters", icon:GiTheater},
      // {id:6, path:'/work',name:"Work plan", icon:SlCalender}
    ]

  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>

<div className='flex justify-center md:justify-start items-center  md:space-x-5'>
  
  <h1 className="p-2 rounded font-semibold bg-black text-white hidden md:flex">Dev_Blogs</h1>
</div>
      <ul className='mt-6 space-y-6'>
        {sideBar_link.map((link,index)=> (
          <li key={link.id} className={`font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-100 text-indigo-500" :""}`}>
            <Link to={link.path} className='flex justify-center md:justify-start items-center  md:space-x-5' onClick={()=> handleClick(index)}>
            <span>{link.icon()}</span>
            <span className='text-sm text-gray-500 hidden md:flex'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SideBar