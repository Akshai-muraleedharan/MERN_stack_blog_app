	import { useState } from 'react'
	import CreateBlogComponent from '../../components/authComponents/CreateBlogComponent'
	import { authCreateBlog } from '../../services/blogServices'
	import { ToastContainer, toast } from 'react-toastify';
	import { useNavigate } from 'react-router-dom';
	import useAuthStore from '../../store/authStore';

	const AuthCreateBlogPage = () => {
	const [upload, setUpload] = useState(0)
	const [loading,setLoading] = useState(false)
    const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
	const navigate = useNavigate()

	const blogCreate = async (data) => {		
			setLoading(true)				
			let stopTimeOut =	setInterval(() => {
				setUpload(prev => prev + 10)		
			},1000)
				
		try {
			
		 const res = await authCreateBlog(data)
			clearTimeout(stopTimeOut)
			setUpload(100)
			if(res.success === true){
				setLoading(false)
			}
			setUpload(0)
			toast.success("Blog Created Successfully")
			navigate("/blog/user-profile")
		} catch (error) {
			 if(error.response.data.success === false){
				toast.error(error.response.data.message)
			 }
			 if(error?.response?.data.message === "no token"){
                SetUserNoToken(null)
            }
			 clearTimeout(stopTimeOut)
			setLoading(false)
			setUpload(0)			
		}
	}
  return (
	<div className='px-5 md:px-10 lg:px-32 dark:bg-dark-bg w-full mb-5 bg-[#f9f9f9]'>
	  {loading && <progress className="progress progress-primary  sticky top-0 w-full" value={upload} max={100} ></progress>}
       <CreateBlogComponent  loading={loading} blogCreate={blogCreate} ToastContainer={ToastContainer} /> 
	</div> 
	)
 }

export default AuthCreateBlogPage