import React from 'react'
import AuthHeader from '../ui/authLayout/AuthHeader'
import Footer from '../ui/rootLayout/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex flex-col dark:bg-dark-bg min-h-[100vh]'>
        <AuthHeader />
        <Outlet />
    {/* footer taken from rootlayout ui */}
        <Footer  />
    </div>
  )
}

export default AuthLayout