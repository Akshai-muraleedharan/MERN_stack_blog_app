import React, { useEffect, useState } from 'react'
import { OAuth } from '../../components/commonComponents/OAuth'
import { Link, useLocation } from 'react-router-dom'
import {useForm} from "react-hook-form"

const SignUpComponent = ({isLoading,authUserCreate,err,ToastContainer}) => {

    const {register,handleSubmit} = useForm()
      
      const [passwordOpen,setPasswordOpen] = useState(true)

      const changePasswordText = () => {
        setPasswordOpen((prev) => prev !== true)
       }
    
         const location = useLocation()

      const onSubmit = (data) => {
        authUserCreate(data)
      }

  return (
  <>
    <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 dark:bg-dark-cards-bg  dark:border-0  border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">

    <label className="fieldset-label dark:text-dark-smalls-text text-black">Username</label>
    <input type="text" {...register('username')} name={"username"} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts dark:focus dark:focus:border-dark-inputs-focus" placeholder="username" />
    
    <label className="fieldset-label dark:text-dark-smalls-text text-black">Email</label>
    <input type="text" {...register('email')} name={"email"}  className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts dark:focus dark:focus:border-dark-inputs-focus" placeholder="Email" />
   
    <div className='relative'>
    <label className="fieldset-label dark:text-dark-smalls-text text-black">Password</label>   
    <input type={passwordOpen ? "password" : "text" } {...register('password')} name={"password"} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts dark:focus dark:focus:border-dark-inputs-focus" placeholder="Password" />
    <span className='absolute top-7 right-2 cursor-pointer dark:text-dark-inputs-texts' onClick={changePasswordText}>{passwordOpen ? "show" : "Hide"}</span>
    </div>
    

    {   <button disabled={isLoading} className="btn btn-neutral dark:hover:bg-gray-600 dark:btn-primary mt-4 border-black hover:bg-gray-800 dark:border-dark-borders-color  text-white">{isLoading ? "Loading..." : "Login"}</button> }

    <div className='w-full text-end text-red-500 h-5'>{err && err}</div>

   
   {location.pathname === "/admin/user/create" ? null : <div className='flex gap-1 items-center mt-2'>
    <p className='dark:text-dark-paragraph text-black'>you have an account? </p>
    <Link to={"/login"}> <span className='text-xs dark:text-blue-400 text-blue-500 cursor-pointer'>Login</span> </Link>
    </div>}

   {location.pathname === "/admin/user/create" ? null : <div className="divider dark:text-dark-smalls-text">or</div>}

  
  {location.pathname === "/admin/user/create" ? null : <OAuth />}
  
 </form>
 <ToastContainer />
  </>
  )
}

export default SignUpComponent