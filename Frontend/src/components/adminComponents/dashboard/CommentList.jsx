import React, { useState } from 'react'
import { authCommentDelete } from '../../../services/adminSevices'

    const CommentList = ({findOneBlog,setOpenCommentTable,fetchBlogList,findBlog,setFindBlog}) => {
    const [loading,setLoading] = useState(false)
    const [findOneComment,setFindOneComment] = useState({})
     
    
console.log(findOneBlog)
    const deleteComment = async (id) => {
        try {
            
            setLoading(true)
            await authCommentDelete(id)
            setLoading(false)


            const deleteComment = findOneBlog.filter((comment) => comment._id !== id)
            setFindBlog(deleteComment)
            fetchBlogList()
             setOpenCommentTable(false) 
            

           
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const  closeComment = () => setOpenCommentTable(false)

    const  openModel = (id) => {
        document.getElementById('my_modal_3').showModal()
        const findComment = findOneBlog.find((item) => item._id === id)
         setFindOneComment(findComment)
        console.log(findComment)
        
    }

  return (
        <div>
           <h1 className='text-center text-2xl my-5 dark:text-white mt-5'>Comments</h1>

             <div className=' flex justify-between gap-5'>
            <div>
            <p className='text-[12px] md:text-[16px] font-semibold'>Blog Title : <span className="font-normal">{findBlog && findBlog.title.slice(0,30) + "..."}</span></p>
            <p className='text-[12px] md:text-[16px] font-semibold'>Blog Author : <span className="font-normal">{ findBlog.author.username}</span></p>
            </div>
            <button onClick={closeComment} className="btn btn-xs btn-neutral md:btn md:btn-neutral ">Close</button>
           </div>

            <div className="overflow-x-auto mt-5">
                <table className="table">
                {/* head */}
                <thead>
                    <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   
                   {findOneBlog.map((comment,index) => (
                     <tr key={comment._id}>
                     <th>{index + 1}</th>
                     <td>{comment.username}</td>
                     <td>{comment.comment}</td>
                     <td> <button className="text-red-500 cursor-pointer" onClick={() => openModel(comment._id)}>Delete</button> </td>
                     </tr>
                   ))}
                      
                </tbody>
                </table>
            </div>
        
       

            

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
                
                <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    
                    <p className="py-4">Are You Sure To Delete This Comment ?</p>
                   {loading ? "Loading" : <h3 className="font-bold text-lg">{findOneComment.comment}</h3>}
                    <div className='flex justify-end'>
                    <button onClick={() => deleteComment(findOneComment._id) } className="btn btn-xs btn-neutral md:btn md:btn-error ">Delete</button>
                    </div>
                </div>
                </dialog>
        </div>
  )
}

export default CommentList