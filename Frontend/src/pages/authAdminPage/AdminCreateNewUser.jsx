  import React, { useState } from 'react'
  import SignUpComponent from '../../components/rootComponents/SignUpComponent'
  import { authAdminUserCreate } from '../../services/adminSevices'
  import {toast,ToastContainer} from 'react-toastify'
  import useAdminAuthStore from '../../store/adminStore'

  const AdminCreateNewUser = () => {
  const {isLoading,setLoading} = useAdminAuthStore()
  const [err,seterr] = useState(null)
  const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)

  err ? setTimeout(() => { seterr(null) } , 5000) : null

  const authUserCreate = async (data) => {
       try {
            setLoading(true)
            const res =  await authAdminUserCreate(data)
            toast.success(res.message)
            setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
              if(error?.response?.data.message === "no token"){
                  SetAdminNoToken(null)
              }
            }
        }
  return (
    <>
      <h2 className='text-center mt-5 font-bold text-3xl dark:text-dark-heads text-black'>Create New User</h2>
      <SignUpComponent ToastContainer={ToastContainer} isLoading={isLoading} authUserCreate={authUserCreate} err={err}/>
    </>
  )
}

export default AdminCreateNewUser