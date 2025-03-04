import React from 'react'
import {Link}  from 'react-router-dom'
import CommentCard from '../commonComponents/CommentCard';
const SingleListCard = ({fetchData,dateConvert,loadMore}) => {
  return (
    <div>
            <h1 className='text-center text-lg md:text-2xl lg:text-4xl mt-24 font-semibold '>{fetchData.title}</h1>

            <div className='mt-12 md:mt-20 h-60 md:h-96  '>
                 {loadMore ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-sm"></span></p> : <img className='h-60 md:h-96 w-full object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
            </div>

            <p className='mt-12 md:mt-20 text-[16px] leading-7 text-[#333] font-roboto'>{fetchData.content}</p>

            <div className='my-10 flex justify-between items-center'>

            <span className="inline-flex justify-center text-gray-600 items-center flex-wrap py-1  font-semibold  ">
                {`Like ${fetchData.likes}`}
            </span>

                <div className='gap-5 flex items-center'>
                <Link to={'/login'} >
                <button className="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                </button>
                </Link>

                <Link to={'/login'} >
                    <button className="btn btn-neutral btn-sm ">Add comment</button>
                    </Link>
                </div>
            </div>


            <div className="divider font-semibold">{`By ${fetchData?.author?.username}`}</div>

            <div className='my-10'>
            
            <h3 className='font-semibold'>Comments</h3>
            
            

            <div className='flex flex-col items-center'>
               <CommentCard fetchData={fetchData} dateConvert={dateConvert} />
            </div>
            </div>
    </div>
  )
}

export default SingleListCard