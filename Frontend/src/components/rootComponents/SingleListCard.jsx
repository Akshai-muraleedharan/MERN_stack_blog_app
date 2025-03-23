import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import LikeAndComment from './LikeAndComment';
import AuthLikeAndComment from '../authComponents/AuthLikeAndComment';
import useAuthStore from '../../store/authStore';
import CommentTextArea from '../authComponents/CommentTextArea';
const SingleListCard = ({commentEditLoading,LikeButtonLoading,userUpdateComment,commentDeleteLoading,unLikeButtonLoading,sanitizedContent,fetchData,buttonLoading,dateConvert,userDeleteComment,loadMore,blogId,setLiked,addLike,likedBlog,userClick,unLike,addComment,commentBox,setCommentBox,postComment,checkComment,updateComment,commentForUpdate,setCommentForUpdate}) => {
    
    const {user} = useAuthStore()


   
  return (
    <div>
            <h1 className='text-black text-center text-lg dark:text-dark-heads font-semibold lg:text-3xl md:text-2xl mt-24'>{fetchData.title}</h1>

            <div className='h-60 md:h-96 md:mt-20 mt-12'>
                 {loadMore ? <p className='flex justify-center mt-4'> <span className="loading loading-sm dark:bg-dark-spinners-color loading-spinner"></span> </p> : <img className='h-60 w-full md:h-96 lg:w-[60%] mx-auto object-cover' src={fetchData.image} alt={fetchData.title} loading="lazy" />}
            </div>

            <div className='flex justify-center'>
            <div className='text-black text-center dark:bg-dark-bg dark:text-dark-paragraph min-w-[330px] max-w-[1000px] mt-10' dangerouslySetInnerHTML={{__html:sanitizedContent}} ></div>
            </div>
          

            <div className='flex justify-between items-center my-10'>

            <span className="flex-wrap justify-center text-gray-600 dark:text-dark-smalls-text font-semibold inline-flex items-center py-1">
                { `Like ${fetchData.likes } `}
            </span>

               {user ? <AuthLikeAndComment unLikeButtonLoading={unLikeButtonLoading} LikeButtonLoading={LikeButtonLoading} buttonLoading={buttonLoading} checkComment={checkComment} unLike={unLike} addComment={addComment} userClick={userClick} likedBlog={likedBlog} likedUser={fetchData.likedUsers} addLike={addLike} blogId={blogId} setLiked={setLiked} /> : < LikeAndComment />} 
            </div>


            <div className="text-black dark:text-dark-smalls-text divider font-semibold">{`By ${fetchData?.author?.username}`}</div>

            <div className='my-10'>
            
            <h3 className='text-black dark:text-dark-heads font-semibold'>Comments</h3>
                
             <div className='flex flex-col items-center'>
             { user && commentBox  ? <CommentTextArea commentEditLoading={commentEditLoading} buttonLoading={buttonLoading} userUpdateComment={userUpdateComment} setCommentForUpdate={setCommentForUpdate} commentForUpdate={commentForUpdate} setCommentBox={setCommentBox} postComment={postComment}/>  : checkComment.length === 0 ? <p className='text-black dark:text-dark-smalls-text'>No Comment</p>  :  <CommentCard commentEditLoading={commentEditLoading} commentDeleteLoading={commentDeleteLoading} setCommentForUpdate={setCommentForUpdate} updateComment={updateComment} setCommentBox={setCommentBox} checkComment={checkComment} userDeleteComment={userDeleteComment} dateConvert={dateConvert} />   }
            </div>  
            </div>
    </div>
  )
}

export default SingleListCard