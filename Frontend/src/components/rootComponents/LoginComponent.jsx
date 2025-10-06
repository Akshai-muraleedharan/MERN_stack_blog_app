import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { OAuth } from '../commonComponents/OAuth.jsx'

const LoginComponent = ({ authLogin, err, isLoading }) => {
  const { register, handleSubmit } = useForm()
  const [passwordOpen, setPasswordOpen] = useState(true)
  const changePasswordText = () => {
    setPasswordOpen((prev) => prev !== true)
  }
  const location = useLocation()
  const onSubmit = (data) => {
    authLogin(data)
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs  dark:bg-dark-cards-bg bg-base-200 dark:border-0 border border-base-300 p-4 mt-5 mb-8 mx-auto rounded-box">
        <label className="fieldset-label dark:text-dark-smalls-text text-base_text">Email</label>
        <input type="text" {...register("email")} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts  dark:focus:border-dark-inputs-focus" placeholder="Email" name='email' />
        <div className='relative'>
          <label className="fieldset-label dark:text-dark-smalls-text text-base_text ">Password</label>
          <input type={passwordOpen ? "password" : "text"} {...register("password")} className="input dark:bg-dark-inputs-bg dark:text-dark-inputs-texts  dark:focus:border-dark-inputs-focus" placeholder="Password" name="password" />
          <span className='absolute top-7 right-2 cursor-pointer dark:text-dark-inputs-texts' onClick={changePasswordText}>{passwordOpen ? "show" : "Hide"}</span>
        </div>
        {<button disabled={isLoading} className="btn btn-neutral dark:btn-primary mt-4 border-black dark:hover:bg-gray-600 hover:bg-gray-800 dark:border-dark-borders-color  text-white">{isLoading ? "Loading..." : "Login"}</button>}
        <div className='w-full text-end text-red-500 h-5'>{err && err}</div>
        {location.pathname === "/admin/login" ? null : <div className='flex gap-1 items-center mt-2'>
          <p className='dark:text-dark-paragraph  text-base_text'>Dont have an account? </p>
          <Link to={"/signup"}> <span className='text-xs dark:text-blue-400 text-blue-500 cursor-pointer'>Signup</span> </Link>
        </div>}
        {location.pathname === "/admin/login" ? null : <div className="divider dark:text-dark-smalls-text">or</div>}
        {location.pathname === "/admin/login" ? null : <OAuth />}
      </form>
    </>
  )
}

export default LoginComponent