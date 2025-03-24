import React, { useState } from 'react'
import CreateBlogComponent from '../../components/authComponents/CreateBlogComponent'
import { authAdminCreateBlog } from '../../services/adminSevices'
import useAdminAuthStore from '../../store/adminStore'
import {toast,ToastContainer} from 'react-toastify'

const AdminBlogCreate = () => {

     const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)
        const [loading,setLoading] = useState(false)
    const blogCreate = async (data) => {
            try {
              setLoading(true) 
             const res = await authAdminCreateBlog(data)
             console.log(res)
             setLoading(false)
            toast.success("Blog Created Successfully")
    
               
            } catch (error) {
              setLoading(false)
                 if(error.response.data.success === false){
                    toast.error(error.response.data.message)
                 }
                 if(error?.response?.data.message === "no token"){
                    SetAdminNoToken(null)
                  }
                }
    
            }
        
  return (
    <div className='px-5 md:px-10 lg:px-32 dark:bg-dark-bg w-full mb-5 bg-[#f9f9f9]'>
        <CreateBlogComponent blogCreate={blogCreate} loading={loading} ToastContainer={ToastContainer}/>
    </div>
  )
}

export default AdminBlogCreate