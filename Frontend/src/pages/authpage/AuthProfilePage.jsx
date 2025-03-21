import React, { useEffect, useState } from 'react'
import { authUserProfile } from '../../services/userServices'
import AuthUserProfileComponent from '../../components/authComponents/AuthUserProfileComponent'
import AuthUserBlogsList from '../../components/authComponents/AuthUserBlogsList'
import useAuthStore from '../../store/authStore'

const AuthProfilePage = () => {

  const [userDetails,setUserDetails] = useState({})
  const [ButtonOpen,setButtonOpen] = useState(false)
  const [loading,setLoading] = useState(true)
  const [postedBlog,setPostedBlog] = useState([])

  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
     
     const fetchProfile = async () => {
      try {
        setLoading(true)
          const res = await authUserProfile()

          setUserDetails(res?.userData)
          setPostedBlog(res?.userData.postedBlogs)
          setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        if(error?.response?.data.message === "no token"){
          SetUserNoToken(null)
      }
     }
    }
     const ClickedInput = () =>{
      userDetails.isOAuth ? setButtonOpen(false) : setButtonOpen(true)
     } 



     useEffect(() => {
      fetchProfile()
     },[])

  return (
    <div className='px-5 md:px-10 lg:px-32  w-full mb-5 dark:bg-black bg-[#f9f9f9]' >
       
            <h1 className='text-center mt-10 font-semibold text-2xl dark:text-white'>Profile</h1>
  
               {loading ? <p className='flex justify-center mt-4'><span className="loading dark:bg-white loading-spinner loading-md"></span></p> : <AuthUserProfileComponent fetchProfile={fetchProfile} ClickedInput={ClickedInput} ButtonOpen={ButtonOpen} userDetails={userDetails}/> }
  
               <div className="mt-20 ">
  
              
               
                <h1 className='text-center mt-10 mb-5 font-semibold text-2xl dark:text-white'>Posted Blogs</h1>
  
                {loading ? <p className='flex justify-center mt-4'><span className="loading dark:bg-white loading-spinner loading-md"></span></p> : <AuthUserBlogsList  postedBlog={postedBlog}  /> }
               
               </div>
       </div>
     
  )
}

export default AuthProfilePage