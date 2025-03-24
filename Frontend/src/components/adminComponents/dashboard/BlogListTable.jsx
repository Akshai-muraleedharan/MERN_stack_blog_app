import React, { useState } from 'react'
import {ToastContainer} from "react-toastify"
import {Link} from 'react-router-dom'
const BlogListTable = ({loadingDelete,blogsData,setFindOneBlog,setOpenCommentTable,setFindBlog,deleteBlog}) => {

   
  const [oneBlog,setOneBlog] = useState({})

   


    const dateConvert = (item) => {
        const date = new Date(item)    
        const formattedDate = date.toLocaleString('en-US',{
            dateStyle:"long",    
        });
        const  [month,day,year] = formattedDate.split(" ")
            return `${day} ${month} ${year}`
      }

      const openComment = (id) => {
          const findBlog = blogsData.find((item) => item._id === id)

          setFindBlog(findBlog)
          setFindOneBlog(findBlog.comments)
          setOpenCommentTable(true)
      }

      const openBlogModel = (id) => {
         document.getElementById('my_modal_1').showModal()
         const  blog = blogsData.find((item) => item._id === id) 
         setOneBlog(blog)

      }

      const userDeleteBlog = async (id) => {
         await deleteBlog(id)
           setTimeout(() => {
            document.getElementById('my_modal_1').close()
           },1000) 
         
            
      }


  return (

    <div>
           {blogsData.length === 0 ? <p className='dark:text-dark-texts-color'>no data Go back</p> : <div className="overflow-x-auto">
            <table className="table table-sm dark:bg-dark-cards-bg">
                {/* head */}
                <thead>
                <tr className='dark:text-dark-smalls-text'>
                    <th></th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Likes</th>
                    <th>comments</th>
                    <th>Views</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                
               { blogsData.map((item,index) => (
                 <tr key={item._id}>
                 <td className='dark:text-dark-smalls-text text-black'>{index + 1}</td>
                 <td className='dark:text-dark-smalls-text text-black'>{item.author.username}</td>
                 <td className='dark:text-dark-smalls-text text-black'> <Link to={`/admin/blog/${item._id}`} className='hover:text-gray-400'>{item.title.slice(0,40) +"..."}</Link></td>
                 <td className='dark:text-dark-smalls-text text-black'>{item.category}</td>
                 <td className='text-center font-semibold dark:text-dark-smalls-text text-black'>{item.likes}</td>
                 <td className='text-center font-semibold dark:text-dark-smalls-text text-black'>{item.comments.length > 0 ? <button onClick={() => openComment(item._id)} className='btn btn-accent btn-outline btn-xs cursor-pointer'>{item.comments.length}</button> : item.comments.length}</td>
                 <td className='text-center font-semibold dark:text-dark-smalls-text text-black'>{item.view}</td>
                 <td className='dark:text-dark-smalls-text text-black' >{ dateConvert(item.createdAt.slice(0,10))}</td>
                 <td className='dark:text-dark-smalls-text text-black'>{ dateConvert(item.updatedAt.slice(0,10))}</td>
                 {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td>}
                 <td><button className="text-red-500 cursor-pointer" onClick={() => openBlogModel(item._id)}>Delete</button></td>
             </tr>
               ))}
               
                
                </tbody>
            </table>
        </div>}

       

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <form method="dialog">
              
                <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4">Are you Sure To Delete This Blog  ?</p>
                
                <h3 className="text-lg font-bold">{oneBlog.title}</h3>
                 <div className='flex justify-end'>
                    <button onClick={() => userDeleteBlog(oneBlog._id)}  className="btn btn-neutral btn-xs md:btn md:btn-error">{loadingDelete ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}</button>
                   
                    </div>
            </div>
        </dialog>
        <ToastContainer />
</div>
  )
}

export default BlogListTable