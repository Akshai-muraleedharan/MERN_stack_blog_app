    import React, { useState } from 'react'
    import { authCommentDelete } from '../../../services/adminSevices'

    const CommentList = ({findOneBlog,setOpenCommentTable,fetchBlogList,findBlog,setFindBlog}) => {
    const [loading,setLoading] = useState(false)
    const [findOneComment,setFindOneComment] = useState({})
     
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
    }

  return (
        <div>
           <h1 className='text-center text-2xl my-5 dark:text-dark-heads mt-5'>Comments</h1>
             <div className=' flex justify-between items-center gap-5'>
                 <div>
                     <p className='text-[12px] md:text-[16px] font-semibold dark:text-dark-paragraph'>Blog Title : <span className="font-normal">{findBlog && findBlog.title.slice(0,40) + "..."}</span></p>
                     <p className='text-[12px] md:text-[16px] font-semibold dark:text-dark-smalls-text'>Blog Author : <span className="font-normal">{ findBlog.author.username}</span></p>
                </div>
                 <button onClick={closeComment} className="btn btn-xs btn-neutral dark:btn-primary md:btn md:btn-neutral ">Close</button>
            </div>

            <div className="overflow-x-auto mt-5">
                <table className="table dark:bg-dark-cards-bg">
                <thead>
                    <tr className='dark:text-dark-smalls-text'>
                        <th></th>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>   
                   {findOneBlog.map((comment,index) => (
                     <tr key={comment._id}>
                        <td className='dark:text-dark-smalls-text text-black'>{index + 1}</td>
                        <td className='dark:text-dark-smalls-text text-black'>{comment.username}</td>
                        <td className='dark:text-dark-paragraph text-black'>{comment.comment}</td>
                        <td> <button className="text-red-500 cursor-pointer" onClick={() => openModel(comment._id)}>Delete</button> </td>
                     </tr>
                   ))}      
                </tbody>
                </table>
            </div>
                <dialog id="my_modal_3" className="modal">
                <div className="modal-box dark:bg-dark-cards-bg">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle dark:text-dark-smalls-text btn-ghost absolute right-2 top-2">✕</button>
                    </form> 
                    <p className="py-4 dark:text-dark-paragraph">Are You Sure To Delete This Comment ?</p>
                   {loading ? "Loading" : <h3 className="font-bold text-lg dark:text-dark-paragraph">{findOneComment.comment}</h3>}
                    <div className='flex justify-end'>
                         <button onClick={() => deleteComment(findOneComment._id) } className="btn btn-xs btn-neutral md:btn md:btn-error ">Delete</button>
                    </div>
             </div>
        </dialog>
    </div>
  )
}

export default CommentList