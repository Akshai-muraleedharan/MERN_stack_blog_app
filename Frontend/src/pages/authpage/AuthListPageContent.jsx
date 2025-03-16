import React, { useEffect, useState } from 'react'
import { authDeleteBlog, authSingleBlogPage } from '../../services/blogServices'
import DOMpurify from'dompurify'
import { useNavigate, useParams } from 'react-router-dom'
import CreateBlogComponent from '../../components/authComponents/CreateBlogComponent'
import { FaCircleDot } from 'react-icons/fa6'
import useAuthStore from '../../store/authStore'


const AuthListPageContent = () => {
   const [sanitizedContent,setSanitizedContent] = useState("")
   const [fetchData,setfetchData] = useState({})
   const [comments,setComments] = useState([])
   const [loading,setLoading] = useState(true)
   const [view,setView] = useState(false)
   const {id} = useParams()

  const navigate = useNavigate()
  const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken)
           
  const fetchSinglePage = async () => {  
    try {
      setLoading(true)
      const res = await  authSingleBlogPage(id) 
      setfetchData(res?.data) 
      setComments(res?.data.comments)
       const sanitized = DOMpurify.sanitize(res?.data?.content)
       setSanitizedContent(sanitized)
       setLoading(false)
    } catch (error) {
      console.log(error)
      if(error?.response?.data.message === "no token"){
        SetUserNoToken(null)
      }
      setLoading(false)
    }
 
            
  }

  const dateConvert = (item) => {
    const date = new Date(item)

    const formattedDate = date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
    });
        return formattedDate
  }

   const editBlog = () => {
    setView(true)
   }

    const deleteBlog = () => {
    try {
      authDeleteBlog(fetchData._id)
      navigate("/blog/user-profile")
    } catch (error) {
      console.log(error)
        if(error?.response?.data.message === "no token"){
          SetUserNoToken(null)
        }
    }
  }


  useEffect(()=> {
    fetchSinglePage()
  },[])
  return (
    
    <div className="px-5 md:px-10 lg:px-32 ">
    {loading ? <p className='flex justify-center mt-4'><span className="loading loading-spinner dark-bg-white loading-md"></span></p> :  view ? <CreateBlogComponent view={view} fetchSinglePage={fetchSinglePage} setView={setView} fetchData={fetchData} sanitizedContent={sanitizedContent} /> : <div>
         <div className='flex justify-end '>
            <div className='flex gap-5'>
            <button className="btn btn-neutral mt-5" onClick={editBlog}>Edit Blog</button>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
              <button className="btn btn-error text-white mt-5" onClick={()=>document.getElementById('my_modal_3').showModal()}>Delete Blog</button>
                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box dark:bg-gray-700">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute dark:hover:bg-gray-400 right-2 top-2 dark:text-white">✕</button>
                      </form>
                      <h3 className="font-bold text-lg dark:text-white">Hello!</h3>
                      <p className="py-4 dark:text-white">Are You Sure To Delete This Blog ?</p>
                     <div className='flex justify-end'>
                     <button className="btn btn-error text-white mt-5" onClick={ deleteBlog}>Delete Blog</button>
                     </div>
                    </div>
                  </dialog>

            
            </div>
             </div>
               <div>
                 <h1 className='text-center text-lg md:text-2xl lg:text-4xl dark:text-white text-black mt-24 font-semibold '>{fetchData.title}</h1>
     
                 <div className='mt-12 md:mt-20 h-60 md:h-96  '>
                      {  <img className='h-60 md:h-96 w-full object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
                 </div>

                      <div className='container mx-auto p-4 mb-10'>
                           <div className='mt-10 prose  w-full box-border dark:bg-black bg-white dark:text-white text-black' dangerouslySetInnerHTML={{__html:sanitizedContent}} ></div>
                      </div>
                 
                      <h3 className='font-semibold dark:text-white text-black'>Comments</h3>
                    <div  className=' w-full mx-auto md:w-[80%]  flex flex-col  p-4 shadow-sm my-2  rounded-xl'> 
                              {comments.length === 0 ? <p className='text-center dark:text-white text-black'>No Comment</p> : comments.map((item) => (
                                  
                                  
                                  <ul key={item._id}>
                                  <li className='my-4'>
                                      <p className='font-semibold flex place-items-center dark:text-white text-black gap-1'>{item.username} <FaCircleDot className="text-[6px]"/> <span className='text-xs font-medium text-gray-400' >{dateConvert(item.createdAt.slice(5,10))}</span></p>
                  
                                      <p className='my-3 text-lg dark:text-white text-black'>{item.comment}</p>
                    
                                  </li>
                                  </ul>
                              
                              )) }
                                  </div>  
                 </div>
            </div>
           }


         </div>
   
  )
}

export default AuthListPageContent