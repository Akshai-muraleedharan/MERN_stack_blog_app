import React from 'react'
import { FaCircleDot } from "react-icons/fa6";
const CommentCard = ({fetchData,dateConvert}) => {
  return (
    <div  className=' w-full md:w-[80%]  flex flex-col  p-4 shadow-sm my-2  rounded-xl'> 
            {fetchData?.comments?.map((item) => (
                
                
                <ul key={item._id}>
                <li className='my-4'>
                    <p className='font-semibold flex place-items-center gap-1'>{item.username} <FaCircleDot className="text-[6px]"/> <span className='text-xs font-medium text-gray-400' >{dateConvert(item.createdAt.slice(5,10))}</span></p>

                    <p className='my-3 text-lg'>{item.comment}</p>
                </li>
                </ul>
            
            )) }
                </div>
  )
}

export default CommentCard