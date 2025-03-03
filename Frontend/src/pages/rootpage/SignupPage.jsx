import { useState } from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { userRegister } from '../../services/userServices'
import useAuthStore from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

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

          <h2 className='text-center mt-5 font-bold text-3xl'> Signup</h2>
             
            
             <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">

                <label className="fieldset-label">Username</label>
                <input type="text" {...register('username')} name={"username"} className="input" placeholder="username" />
                
                <label className="fieldset-label">Email</label>
                <input type="text" {...register('email')} name={"email"}  className="input" placeholder="Email" />

                <label className="fieldset-label">Password</label>   
                <input type="password" {...register('password')} name={"password"} className="input" placeholder="Password" />


                { isLoading ? <button disabled="disabled" className="btn btn-neutral mt-4 cursor-not-allowed"><span className="loading loading-spinner loading-sm"></span> Loading...</button> : <button className="btn btn-neutral mt-4">Signup</button> }

                <div className='w-full text-end text-red-500 h-5'>{err && err}</div>

                <div className='flex gap-1 items-center mt-2'>
                <p>you have an account? </p>
                <Link to={"/login"}> <span className='text-xs text-blue-500 cursor-pointer'>Login</span> </Link>
                </div>

                <div className="divider">or</div>

                <button className="btn bg-white text-black border-[#e5e5e5]">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
                </button>
             </form>
            

    </>
  )
}

export default SignupPage