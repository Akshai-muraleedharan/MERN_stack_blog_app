  import React from 'react'
  import { Outlet } from 'react-router-dom'
  import Footer from '../ui/rootLayout/Footer'
  import AuthAdminHeader from '../ui/authLayout/AuthAdminHeader'
  import SideBar from '../components/adminComponents/SideBar'
  import ScrollToTop from '../components/commonComponents/ScrollToTop'

  const AdminLayout = () => {
  return (
    <div className='flex flex-col dark:bg-dark-bg min-h-[100vh]'>       
       <div className='flex'>
          <SideBar/>
         <div className="w-full ml-16 md:ml-56 flex flex-col overflow-auto min-h-[100vh]">
          <AuthAdminHeader />
             <Outlet />
           <Footer  />
           <ScrollToTop />,
         </div>  
       </div>
    </div>
  )
}

export default AdminLayout