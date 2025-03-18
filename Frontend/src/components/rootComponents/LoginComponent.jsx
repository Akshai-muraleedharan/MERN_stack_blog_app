import React from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { OAuth } from '../commonComponents/OAuth.jsx'

const LoginComponent = ({authLogin,err,isLoading}) => {

    const {register,handleSubmit} = useForm()


    const onSubmit =(data) => {
        authLogin(data)
    }
  return (
    <>
      
         <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs  dark:bg-[#21303c] bg-base-200 dark:border-0 border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">
             
            <label className="fieldset-label dark:text-white text-black">Email</label>
            <input type="text" {...register("email")} className="input " placeholder="Email" name='email' />
            
            <label className="fieldset-label dark:text-white text-black ">Password</label>   
            <input type="password" {...register("password")} className="input" placeholder="Password" name="password" />
            

            { isLoading ? <button disabled="disabled" className="btn btn-neutral mt-4 cursor-not-allowed"><span className="loading loading-spinner loading-sm"></span> Loading...</button> : <button className="btn btn-neutral mt-4">Login</button> }

            <div className='w-full text-end text-red-500 h-5'>{err && err}</div>

            <div className='flex gap-1 items-center mt-2'>
            <p className='dark:text-white  text-black'>Dont have an account? </p>
           <Link to={"/signup"}> <span className='text-xs dark:text-blue-400 text-blue-500 cursor-pointer'>Signup</span> </Link>
            </div>

            <div className="divider">or</div>

           <OAuth />
        </form>
    </>
  )
}

export default LoginComponent