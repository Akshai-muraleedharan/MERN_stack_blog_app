import React from 'react'
import AuthHeader from '../ui/authLayout/AuthHeader'
import Footer from '../ui/rootLayout/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div>
        <AuthHeader />
        <Outlet />
    {/* footer taken from rootlayout ui */}
        <Footer  />
    </div>
  )
}

export default AuthLayout