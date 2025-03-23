import useAuthStore from "../../store/authStore"



const AuthLikeAndComment = ({addLike,likedBlog,userClick,unLike,addComment,checkComment,LikeButtonLoading,unLikeButtonLoading}) => {

 
       const {user} = useAuthStore()
        
       const checkUserAddComment = checkComment.find(item => item.userId === user.userId)
  
       
  return (
    <div className='flex gap-5 items-center'>    
    { LikeButtonLoading ? <button className="btn btn-circle "><span className="loading loading-spinner loading-xs"></span></button>  : unLikeButtonLoading ? <button className="btn btn-circle "><span className="loading loading-spinner loading-xs"></span></button> : <button onClick={likedBlog === null ? addLike : unLike  } className={userClick ? "btn btn-circle dark:border dark:border-white btn-neutral" :   likedBlog === null ?  "btn btn-circle" :  "btn btn-circle btn-neutral" }>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={userClick ? "size-[1.2em] text-red-500" : likedBlog === null ? "size-[1.2em]" :  "size-[1.2em] text-red-500"} ><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
    </button>}    
    <button onClick={addComment} disabled={checkUserAddComment} className="btn btn-neutral dark:btn-primary btn-sm">{checkUserAddComment ? "Comment Added" : "Add comment"}</button>   
</div> 
  )
}

export default AuthLikeAndComment