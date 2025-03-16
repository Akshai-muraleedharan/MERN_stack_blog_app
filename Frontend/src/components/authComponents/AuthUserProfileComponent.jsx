import React from 'react'

const AuthUserProfileComponent = ({ClickedInput,userDetails,ButtonOpen}) => {
  return (
    
                <fieldset className=" mx-auto mt-10 fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                                
                                
                <label className="fieldset-label">Username</label>
                <input type="text" className="input" onClick={ClickedInput} defaultValue={userDetails.username} placeholder="My awesome page" />
                
                <label className="fieldset-label">Email</label>
                <input type="text" className="input" onClick={ClickedInput} defaultValue={userDetails.email} placeholder="my-awesome-page" />
                
            {  ButtonOpen &&<>
                <label className="fieldset-label">Password</label>
                <input type="text" className="input" onClick={ClickedInput} placeholder="password" />
            </> }
                
            { ButtonOpen && <> 
            <label className="fieldset-label">Confirm Password</label>
                <input type="text" className="input" onClick={ClickedInput} placeholder="password" /> 
                </>}

            { ButtonOpen && <button className="btn btn-neutral mt-4">update</button>}
            </fieldset>
  )
}

export default AuthUserProfileComponent