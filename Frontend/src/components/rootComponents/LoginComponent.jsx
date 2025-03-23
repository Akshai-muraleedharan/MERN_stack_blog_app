import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { OAuth } from '../commonComponents/OAuth.jsx'

const LoginComponent = ({authLogin,err,isLoading}) => {

    const {register,handleSubmit} = useForm()

        const route = window.location.pathname
 
    const onSubmit =(data) => {
        authLogin(data)
    }
  return (
    <>
      
         <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs  dark:bg-dark-cards-bg bg-base-200 dark:border-0 border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">
             
            <label className="fieldset-label dark:text-dark-smalls-text text-black">Email</label>
            <input type="text" {...register("email")} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts  dark:focus:border-dark-inputs-focus" placeholder="Email" name='email' />
            
            <label className="fieldset-label dark:text-dark-smalls-text text-black ">Password</label>   
            <input type="password" {...register("password")} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts  dark:focus:border-dark-inputs-focus" placeholder="Password" name="password" />
            

            { isLoading ? <button disabled="disabled" className="btn btn-neutral mt-4 cursor-not-allowed"><span className="loading loading-spinner loading-sm"></span> Loading...</button> : <button className="btn btn-neutral dark:btn-primary mt-4">Login</button> }

            <div className='w-full text-end text-red-500 h-5'>{err && err}</div>

            <div className='flex gap-1 items-center mt-2'>
            <p className='dark:text-dark-paragraph  text-black'>Dont have an account? </p>
           <Link to={"/signup"}> <span className='text-xs dark:text-blue-400 text-blue-500 cursor-pointer'>Signup</span> </Link>
            </div>

           {route === "/admin/login" ? null : <div className="divider dark:text-dark-smalls-text">or</div>}

          {route === "/admin/login" ? null : <OAuth />}
        </form>
    </>
  )
}

export default LoginComponent