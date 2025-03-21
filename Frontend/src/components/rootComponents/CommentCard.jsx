import React from 'react'
import { FaCircleDot } from "react-icons/fa6";
import useAuthStore from '../../store/authStore';
const CommentCard = ({checkComment,dateConvert,setCommentBox,updateComment,userDeleteComment,setCommentForUpdate}) => {


  const {user} = useAuthStore()
   console.log(user.userId)
  const editComment = (id) => {   
     updateComment(id) 
     setCommentBox(true)
  }

  const deleteComment = (id) => {
    userDeleteComment(id)
    setCommentForUpdate(null)
  }
  return (
    <div  className=' w-full md:w-[80%]  flex flex-col  p-4 shadow-sm my-2  rounded-xl'> 
            {checkComment.map((item) => (
                
                
                <ul key={item._id}>
                <li className='my-4'>
                    <p className='font-semibold flex place-items-center gap-1 dark:text-white'>{item.username} <FaCircleDot className="text-[6px]"/> <span className='text-xs font-medium text-gray-400' >{dateConvert(item.createdAt.slice(5,10))}</span></p>

                    <p className='my-3 text-lg dark:text-white'>{item.comment}</p>
                   <div className='flex justify-end gap-2.5'>
                   { item.userId === user.userId  && <button onClick={() => editComment(item._id)} className='text-blue-500 cursor-pointer'>edit</button> }
                   { item.userId === user.userId  && <button onClick={() => deleteComment(item._id)} className='text-red-500 cursor-pointer'>Delete</button>}
                   </div>
                </li>
                </ul>
            
            )) }
                </div>
  )
}

export default CommentCard