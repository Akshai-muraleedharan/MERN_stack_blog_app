import React from 'react'
import Header from '../ui/rootLayout/Header'
import Footer from '../ui/rootLayout/Footer'
import { Outlet } from 'react-router-dom'
const RooyLayout = () => {
  return (
   <div className='flex flex-col min-h-[100vh]'>
     <Header />
        <Outlet />
     <Footer />
   </div>
  )
}

export default RooyLayout