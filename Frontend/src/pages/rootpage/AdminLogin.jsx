 import { useState } from 'react'
 import { useNavigate } from 'react-router-dom'
 import LoginComponent from '../../components/rootComponents/LoginComponent'
 import { adminLogin } from '../../services/adminSevices'
 import useAdminAuthStore from '../../store/adminStore'

  const AdminLogin = () => {
  const setadmin = useAdminAuthStore((state) => state.setadmin)
  const {isLoading,setLoading} = useAdminAuthStore()
  const [err,seterr] = useState(null)

  const navigate = useNavigate();

  err ? setTimeout(() => { seterr(null) } , 5000) : null

  const authLogin = async (data) => {       
        try {
          setLoading(true)
          const response = await adminLogin(data)  
          if(response.success === true){
            setadmin(response.data)
            navigate('/admin')
          }
          setLoading(false)   
        } catch (error) {
          seterr(error?.response?.data?.message)
          setLoading(false)   
        }
    } 
  
  return (
   <>
    <h2 className='text-center mt-5 font-bold text-3xl dark:text-white text-black'>Admin Login</h2>
    <LoginComponent isLoading={isLoading} err={err} authLogin={authLogin} />
   </>
  )
}

export default AdminLogin