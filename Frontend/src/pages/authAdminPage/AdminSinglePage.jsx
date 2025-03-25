  import React, { useEffect, useState } from 'react'
  import {useNavigate, useParams} from 'react-router-dom'
  import {authAdminApproval, authAdminNotApproval, authSingleBlog} from '../../services/adminSevices.js'
  import DOMpurify from'dompurify'
  import {toast,ToastContainer} from 'react-toastify'

  const AdminSinglePage = () => {
  const [fetchData,setFetchData] = useState({})
  const [sanitizedContent,setSanitizedContent] = useState("")
  const [loadMore,setLoadMore] = useState(true)
  const [loading,setLoading] = useState(true)
  const [loadingApprove,setLoadinApprove] = useState(false)
  const {id} = useParams()

  const navigate = useNavigate() 
  
  const fetchSingleBlog = async () => {
    try {
     const res = await authSingleBlog(id)
     setFetchData(res?.data)
     const sanitized = DOMpurify.sanitize(res?.data?.content)
     setSanitizedContent(sanitized)
     setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const doApprove = async (id) => {
      try {
        setLoadinApprove(true)
      const res =  await authAdminApproval(id)
        fetchSingleBlog()
        setLoadinApprove(false)
        toast.success(res?.message)
      } catch (error) {
        console.log(error)
        setLoadinApprove(true)
      }
  }

  const cancelApprove = async (id) => {
    try {
      setLoadinApprove(true)
      const res = await authAdminNotApproval(id)
      fetchSingleBlog()
      setLoadinApprove(false)
      toast.success(res?.message)
    } catch (error) {
      setLoadinApprove(false)
     console.log(error) 
    }
  }

  const goBack = () => navigate(-1)

  setTimeout(()=>{ setLoadMore(false)},3000)

  useEffect(() => {
    fetchSingleBlog()
  },[])

  return (
    <div className="lg:px-32 md:px-10 px-5 overflow-hidden">
        { loading ? <p className='flex justify-center mt-4'><span className="loading dark:bg-dark-spinners-color loading-md loading-spinner"></span></p> : <>
        <div className='mt-5 flex justify-between gap-5'>
           <button onClick={goBack} className='btn sm:btn-sm md:btn-md'>back</button>
           <button onClick={fetchData.published ? () =>  cancelApprove(fetchData._id)  : () =>  doApprove(fetchData._id)} className={fetchData.published ? "btn btn-sm md:btn btn-success" : "btn btn-sm md:btn  btn-error" } >{loadingApprove ? <span className="loading loading-spinner loading-xs"></span> : fetchData.published ? "Approved" : "Not-Approved"}</button>
       </div>
    <ToastContainer />
    <h1 className='text-black text-center text-lg dark:text-white font-semibold lg:text-4xl md:text-2xl mt-24'>{fetchData.title}</h1>
        <div className='h-60 md:h-96 md:mt-20 mt-12'>
             {loadMore ? <p className='flex justify-center mt-4'> <span className="loading dark:bg-dark-spinners-color loading-sm loading-spinner"></span> </p> : <img className='h-60 w-full lg:w-[60%] mx-auto md:h-96 object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
        </div>
            <div className='flex justify-center'>
               <div className='text-black px-5 dark:bg-dark-bg dark:text-dark-paragraph min-w-[310px] max-w-[1000px] mt-10' dangerouslySetInnerHTML={{__html:sanitizedContent}} ></div>
            </div>    
            <div className="text-black dark:text-dark-smalls-text divider font-semibold">{`Author  :  ${fetchData?.author?.username}`}</div>
             </> }   
        </div>
    )
  }

  export default AdminSinglePage