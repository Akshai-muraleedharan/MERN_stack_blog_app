import React, { useState } from 'react'
import useAuthStore from '../../store/authStore'
import { authUserLogOut, authUserProfileUpdate } from '../../services/userServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'

const AuthUserProfileComponent = ({ ClickedInput, userDetails, ButtonOpen }) => {
    const [passwordOpen, setPasswordOpen] = useState(true)
    const [confirmPasswordOpen, setConfirmPasswordOpen] = useState(true)
    const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)
    const [logOutLoading, setLogOutLoading] = useState(false)
    const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const specialCharRegex = /[^A-Za-z0-9]/;

    const onSubmit = async (data) => {
        let err;
        try {
            const validatePassword = () => {
                if (data.password !== data.confirmPassword) {
                    toast.error("Password is not correct")
                    err = "yes"
                } else if (data.password <= 6) {
                    toast.error("Password should be at least 6 characters long")
                    err = "yes"
                } else if (specialCharRegex.test(data.password)) {
                    toast.error("Password should only contain letters  and digits (no special characters)")
                    err = "yes"
                }
            }
            if (data.password.length > 0) {
                validatePassword(data)
            }
            if (err === "yes") {
                null
            } else {
                setProfileUpdateLoading(true)
                const res = await authUserProfileUpdate(data)
                if (res.success === true) {
                    toast.success(res.message)
                }
                setProfileUpdateLoading(false)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
            setProfileUpdateLoading(false)
            if (error?.response?.data.message === "no token") {
                SetUserNoToken(null)
            }
        }
    }

    const changePasswordText = () => {
        setPasswordOpen((prev) => prev != true)
    }

    const changeConfirmPasswordText = () => {
        setConfirmPasswordOpen((prev) => prev !== true)
    }

    const logOut = async () => {
        try {
            setLogOutLoading(true)
            await authUserLogOut()
            SetUserNoToken(null)
            navigate("/login")
            setLogOutLoading(false)
        } catch (error) {
            console.log(error)
            if (error?.response?.data.message === "no token") {
                SetUserNoToken(null)
            }
            setLogOutLoading(false)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto mt-10 fieldset w-xs dark:bg-dark-cards-bg dark:border-0 bg-base-200 border border-base-300 p-4 rounded-box">

                <label className="fieldset-label dark:text-dark-smalls-text text-base_text">Username</label>
                <input type="text" {...register("username")} className="input" name="username" onClick={ClickedInput} defaultValue={userDetails.username} placeholder="My awesome page" />

                <label className="fieldset-label dark:text-dark-smalls-text text-base_text">Email</label>
                <input type="text" {...register('email')} className="input" name="email" onClick={ClickedInput} defaultValue={userDetails.email} placeholder="my-awesome-page" />

                {ButtonOpen && <div className='relative'>
                    <label className="fieldset-label dark:text-dark-smalls-text text-base_text">New Password</label>
                    <input type={passwordOpen ? "password" : "text"} {...register('password')} className="input" name="password" placeholder="password" />
                    <span className='absolute top-7 right-2 cursor-pointer ' onClick={changePasswordText}>{passwordOpen ? "show" : "Hide"}</span>
                </div>}

                {ButtonOpen && <div className='relative'>
                    <label className="fieldset-label dark:text-dark-smalls-text text-base_text">Confirm Password</label>
                    <input type={confirmPasswordOpen ? "password" : "text"} {...register('confirmPassword')} className="input" name="confirmPassword" placeholder="password" />
                    <span className='absolute top-7 right-2 cursor-pointer' onClick={changeConfirmPasswordText}>{confirmPasswordOpen ? "show" : "Hide"}</span>
                </div>}

                {ButtonOpen && <button disabled={profileUpdateLoading} className="btn btn-neutral dark:btn-primary mt-4 border-black dark:hover:bg-gray-600 hover:bg-gray-800 dark:border-dark-borders-color  text-white">{profileUpdateLoading ? "Loading..." : "Update"}</button>}
                <button type='button' disabled={logOutLoading} onClick={logOut} className=' cursor-pointer btn btn-error font-semibold mt-4 hover:bg-red-400  text-white dark:border-dark-borders-color'>{logOutLoading ? "Loading..." : "LogOut"}</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AuthUserProfileComponent