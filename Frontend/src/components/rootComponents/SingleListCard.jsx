import React from 'react'
import CommentCard from '../commonComponents/CommentCard';
import LikeAndComment from './LikeAndComment';
import AuthLikeAndComment from '../authComponents/AuthLikeAndComment';
import useAuthStore from '../../store/authStore';
const SingleListCard = ({fetchData,dateConvert,loadMore,blogId,setLiked,addLike,likedBlog,userClick,unLike}) => {

   const {user} = useAuthStore()

   

  return (
    <div>
            <h1 className='text-center text-lg md:text-2xl lg:text-4xl mt-24 font-semibold '>{fetchData.title}</h1>

            <div className='mt-12 md:mt-20 h-60 md:h-96  '>
                 {loadMore ? <p className='flex justify-center mt-4'><span className="loading loading-spinner loading-sm"></span></p> : <img className='h-60 md:h-96 w-full object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
            </div>

            <p className='mt-12 md:mt-20 text-[16px] leading-7 text-[#333] font-roboto'>{fetchData.content}</p>

            <div className='my-10 flex justify-between items-center'>

            <span className="inline-flex justify-center text-gray-600 items-center flex-wrap py-1  font-semibold  ">
                { `Like ${fetchData.likes } `}
            </span>

               {user ? <AuthLikeAndComment unLike={unLike} userClick={userClick} likedBlog={likedBlog} likedUser={fetchData.likedUsers} addLike={addLike} blogId={blogId} setLiked={setLiked} /> : < LikeAndComment />} 
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