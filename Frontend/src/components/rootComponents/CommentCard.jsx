import React from 'react'
import { FaCircleDot } from "react-icons/fa6";
import useAuthStore from '../../store/authStore';
const CommentCard = ({commentDeleteLoading,checkComment,dateConvert,setCommentBox,updateComment,userDeleteComment,setCommentForUpdate}) => {


  const {user} = useAuthStore()
 
  const editComment = (id) => {   
     updateComment(id) 
     setCommentBox(true)
  }

  const deleteComment = (id) => {
    userDeleteComment(id)
    setCommentForUpdate(null)
  }
  return (
    <div  className='flex flex-col p-4 rounded-xl shadow-sm w-full md:w-[80%] my-2'> 
            {checkComment.map((item) => (
                
                
                <ul key={item._id}>
                <li className='my-4'>
                    <p className='flex dark:text-white font-semibold gap-1 place-items-center'>{item.username} <FaCircleDot className="text-[6px]"/> <span className='text-gray-400 text-xs font-medium' >{dateConvert(item.createdAt.slice(5,10))}</span></p>

                    <p className='text-lg dark:text-white my-3'>{item.comment}</p>
                   <div className='flex justify-end gap-2.5'>
                   {user && item.userId === user.userId  &&  <button onClick={() => editComment(item._id)} className='text-blue-500 cursor-pointer'>edit</button> }
                   {user && item.userId === user.userId  && commentDeleteLoading ? <button> <span className="loading loading-spinner loading-xs"></span> </button> : user && <button onClick={() => deleteComment(item._id)} className='text-red-500 cursor-pointer'>Delete</button>}
                   </div>
                </li>
                </ul>
            
            )) }
                </div>
  )
}

export default CommentCard