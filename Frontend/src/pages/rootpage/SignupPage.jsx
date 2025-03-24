import { useState } from 'react'
import { userRegister } from '../../services/userServices'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import SignUpComponent from '../../components/rootComponents/SignUpComponent.jsx'
import {toast,ToastContainer} from "react-toastify"

const SignupPage = () => {

 
  const setUser = useAuthStore((state) => state.setUser)
  const {isLoading,setLoading} = useAuthStore()
  const [err,seterr] = useState(null)


  
  const navigate = useNavigate();

  err ? setTimeout(() => { seterr(null) } , 5000) : null
 
  const authUserCreate = async (data) => {
      try {
        setLoading(true)
        const response = await userRegister(data)
        if(response.success === true){
          setUser(response.data)
          navigate("/blog")
        }
        toast.success("user Created Successfully")
        setLoading(false)
 
      } catch (error) {
        seterr(error?.response?.data?.message)
        setLoading(false)   
      }
  } 

  return (
    <>

          <h2 className='text-center mt-5 font-bold text-3xl dark:text-dark-heads text-black'> Signup</h2>
       <SignUpComponent isLoading={isLoading} ToastContainer={ToastContainer} authUserCreate={authUserCreate} err={err}/>
    </>
  )
}

export default SignupPage