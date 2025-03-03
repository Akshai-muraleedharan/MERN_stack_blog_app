import React, { useState } from 'react'


const Test = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    const objects = {
        email:email,
        password:password
    }

    const submitHandle = async (e) => {
         e.preventDefault()
        try {
          const res = await configTest(objects)

          console.log(res)
        } catch (error) {
            console.log(error)
        }
    } 

  return (
    <form onSubmit={submitHandle} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <legend className="fieldset-legend">Login</legend>
  
  <label className="fieldset-label">Email</label>
  <input type="email" className="input" placeholder="Email"  name="email"   onChange={(e) => setEmail(e.target.value)}/>
  
  <label className="fieldset-label">Password</label>
  <input type="password" className="input" placeholder="Password" name="password"  onChange={(e) => setPassword(e.target.value)}/>
  
  <button className="btn btn-neutral mt-4">Login</button>
   </form>
  )
}

export default Test