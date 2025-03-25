 import { useState } from 'react'
 import useAuthStore from '../../store/authStore'
 import { useNavigate } from 'react-router-dom'
 import { userLogin } from '../../services/userServices'
 import LoginComponent from '../../components/rootComponents/LoginComponent'

 const LoginPage = () => {
 const setUser = useAuthStore((state) => state.setUser)
 const {isLoading,setLoading} = useAuthStore()
 const [err,seterr] = useState(null)

 const navigate = useNavigate();

  err ? setTimeout(() => { seterr(null) } , 5000) : null

   const authLogin = async (data) => {
        try {
          setLoading(true)
          const response = await userLogin(data)
          if(response.success === true){
            setUser(response.data)
            navigate('/blog')
          }
          setLoading(false)  
        } catch (error) {
          seterr(error?.response?.data?.message)
          setLoading(false)   
        }
    } 
  
  return (
   <>
    <h2 className='text-center mt-5 font-bold text-3xl dark:text-dark-heads text-black'>Login</h2>
    <LoginComponent isLoading={isLoading} err={err} authLogin={authLogin} />
   </>
  )
}

export default LoginPage