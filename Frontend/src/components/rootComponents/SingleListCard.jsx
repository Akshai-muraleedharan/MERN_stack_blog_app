import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import LikeAndComment from './LikeAndComment';
import AuthLikeAndComment from '../authComponents/AuthLikeAndComment';
import useAuthStore from '../../store/authStore';
import CommentTextArea from '../authComponents/CommentTextArea';
const SingleListCard = ({userUpdateComment,sanitizedContent,fetchData,dateConvert,userDeleteComment,loadMore,blogId,setLiked,addLike,likedBlog,userClick,unLike,addComment,commentBox,setCommentBox,postComment,checkComment,updateComment,commentForUpdate,setCommentForUpdate}) => {
    
    const {user} = useAuthStore()


   
  return (
    <div>
            <h1 className='text-center text-lg md:text-2xl lg:text-4xl mt-24 font-semibold '>{fetchData.title}</h1>

            <div className='mt-12 md:mt-20 h-60 md:h-96  '>
                 {loadMore ? <p className='flex justify-center mt-4'> <span className="loading loading-spinner loading-sm"></span> </p> : <img className='h-60 md:h-96 w-full object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
            </div>

            <div className='mt-10 min-w-[330px]' dangerouslySetInnerHTML={{__html:sanitizedContent}} ></div>

            <div className='my-10 flex justify-between items-center'>

            <span className="inline-flex justify-center text-gray-600 items-center flex-wrap py-1  font-semibold  ">
                { `Like ${fetchData.likes } `}
            </span>

               {user ? <AuthLikeAndComment checkComment={checkComment} unLike={unLike} addComment={addComment} userClick={userClick} likedBlog={likedBlog} likedUser={fetchData.likedUsers} addLike={addLike} blogId={blogId} setLiked={setLiked} /> : < LikeAndComment />} 
            </div>


            <div className="divider font-semibold">{`By ${fetchData?.author?.username}`}</div>

            <div className='my-10'>
            
            <h3 className='font-semibold'>Comments</h3>
                
             <div className='flex flex-col items-center'>
             { user && commentBox  ? <CommentTextArea userUpdateComment={userUpdateComment} setCommentForUpdate={setCommentForUpdate} commentForUpdate={commentForUpdate} setCommentBox={setCommentBox} postComment={postComment}/>  : checkComment.length === 0 ? <p>No Comment</p>  :  <CommentCard setCommentForUpdate={setCommentForUpdate} updateComment={updateComment} setCommentBox={setCommentBox} checkComment={checkComment} userDeleteComment={userDeleteComment} dateConvert={dateConvert} />   }
            </div>  
            </div>
    </div>
  )
}

export default SingleListCard