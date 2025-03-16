import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { userRegister } from '../../services/userServices'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { OAuth } from '../../components/commonComponents/OAuth'

const SignupPage = () => {

  const {register,handleSubmit} = useForm()
  const setUser = useAuthStore((state) => state.setUser)
  const {isLoading,setLoading} = useAuthStore()
  const [err,seterr] = useState(null)


  
  const navigate = useNavigate();

  err ? setTimeout(() => { seterr(null) } , 5000) : null
 
  const onSubmit = async (data) => {
      try {
        setLoading(true)
        const response = await userRegister(data)
        if(response.success === true){
          setUser(response.data)
          navigate("/blog")
        }
        
        setLoading(false)
 
      } catch (error) {
        seterr(error?.response?.data?.message)
        setLoading(false)   
      }
  } 

  return (
    <>

          <h2 className='text-center mt-5 font-bold text-3xl dark:text-white text-black'> Signup</h2>
             
            
             <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 dark:bg-[#21303c]  dark:border-0  border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">

                <label className="fieldset-label dark:text-white text-black">Username</label>
                <input type="text" {...register('username')} name={"username"} className="input" placeholder="username" />
                
                <label className="fieldset-label dark:text-white text-black">Email</label>
                <input type="text" {...register('email')} name={"email"}  className="input" placeholder="Email" />

                <label className="fieldset-label dark:text-white text-black">Password</label>   
                <input type="password" {...register('password')} name={"password"} className="input" placeholder="Password" />


                { isLoading ? <button disabled="disabled" className="btn btn-neutral mt-4 cursor-not-allowed"><span className="loading loading-spinner loading-sm"></span> Loading...</button> : <button className="btn btn-neutral mt-4">Signup</button> }

                <div className='w-full text-end text-red-500 h-5'>{err && err}</div>

                <div className='flex gap-1 items-center mt-2'>
                <p className='dark:text-white text-black'>you have an account? </p>
                <Link to={"/login"}> <span className='text-xs dark:text-blue-400 text-blue-500 cursor-pointer'>Login</span> </Link>
                </div>

                <div className="divider">or</div>

               {/* google btn */}
               <OAuth />
             </form>
             

    </>
  )
}

export default SignupPage