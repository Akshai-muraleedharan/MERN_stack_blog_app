import React from 'react'
import useAuthStore from '../../store/authStore'
import { authUserLogOut } from '../../services/userServices'
import { useNavigate } from 'react-router-dom'

const AuthUserProfileComponent = ({ClickedInput,userDetails,ButtonOpen}) => {

    const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
    const navigate = useNavigate()
    

    const logOut = async () =>  {
        try {
            await authUserLogOut()
            SetUserNoToken(null)
            navigate("/login")

        } catch (error) {
            console.log(logOut)
        }
    }
  return (
    
                <fieldset className=" mx-auto mt-10 fieldset w-xs dark:bg-[#21303c] dark:border-0 bg-base-200 border border-base-300 p-4 rounded-box">
                                
                                
                <label className="fieldset-label dark:text-white text-black">Username</label>
                <input type="text" className="input dark:bg-gray-300 " onClick={ClickedInput} defaultValue={userDetails.username} placeholder="My awesome page" />
                
                <label className="fieldset-label dark:text-white text-black">Email</label>
                <input type="text" className="input dark:bg-gray-300 " onClick={ClickedInput} defaultValue={userDetails.email} placeholder="my-awesome-page" />
                
            {  ButtonOpen &&<>
                <label className="fieldset-label dark:text-white text-black">Password</label>
                <input type="text" className="input dark:bg-gray-300 " onClick={ClickedInput} placeholder="password" />
            </> }
                
            { ButtonOpen && <> 
            <label className="fieldset-label dark:text-white text-black">Confirm Password</label>
                <input type="text" className="input dark:bg-gray-300 " onClick={ClickedInput} placeholder="password" /> 
                </>}

            { ButtonOpen && <button className="btn btn-neutral mt-4">update</button>}
            <button type='button' onClick={logOut} className=' cursor-pointer font-semibold mt-4 text-red-500'>LogOut</button>
            </fieldset>
  )
}

export default AuthUserProfileComponent