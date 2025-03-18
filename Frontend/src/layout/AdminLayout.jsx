import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../ui/rootLayout/Footer'
import AuthAdminHeader from '../ui/authLayout/AuthAdminHeader'
import SideBar from '../components/adminComponents/SideBar'

const AdminLayout = () => {
  return (
    <div className='flex flex-col dark:bg-black min-h-[100vh]'>
        
       <div className='flex'>
       <SideBar/>
       <div className="w-full ml-16 md:ml-56 flex flex-col overflow-auto min-h-[100vh]">
       <AuthAdminHeader />
       <Outlet />
       <Footer  />
       </div>
       
       
       </div>
    {/* footer taken from rootlayout ui */}
        
    </div>
  )
}

export default AdminLayout