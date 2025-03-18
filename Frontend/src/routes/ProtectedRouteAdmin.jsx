import React from 'react'
import {Navigate} from 'react-router-dom'
import useAdminAuthStore from '../store/adminStore'

const ProtectedRouteAdmin = ({children}) => {

    const {admin} = useAdminAuthStore()
    

  return admin ? children : <Navigate to={"/admin/login"} />
}

export default ProtectedRouteAdmin