import React from 'react'
import {useForm} from "react-hook-form"

const CommentTextArea = ({commentEditLoading,buttonLoading,setCommentBox,postComment,commentForUpdate,setCommentForUpdate,userUpdateComment}) => {

  const closeBox = () => {
     setCommentBox(false)
     setCommentForUpdate(null)
  }

  

  const {register,handleSubmit} = useForm()

  

  const onCommentadd = (data) => {
       postComment(data)
       
  }

  const onCommentUpdate = (data) => {
    userUpdateComment(commentForUpdate._id,data)
  }

  return (
   <div className='relative'>
 
   <button className="btn btn-circle btn-ghost btn-md absolute right-1 dark:bg-white" onClick={closeBox}>✕</button>
   
          <form className="fieldset mt-10" onSubmit={commentForUpdate ? handleSubmit(onCommentUpdate) : handleSubmit(onCommentadd)}>
              <textarea {...register("comment")} className="w-3xs sm:w-xl dark:focus:border-dark-inputs-focus textarea dark:text-dark-inputs-texts dark:bg-dark-inputs-bg xl:w-3xl" defaultValue={commentForUpdate ? commentForUpdate.comment : ""} name={"comment"} placeholder="comment"></textarea>
                <button disabled={commentForUpdate ? commentEditLoading : buttonLoading} className="btn btn-neutral dark:btn-primary btn-sm  dark:text-white md:btn-md">
                  submit
                </button>
         </form>
   </div>
   
  )
}

export default CommentTextArea