import React from 'react'
import {useForm} from "react-hook-form"

const CommentTextArea = ({setCommentBox,postComment,commentForUpdate,setCommentForUpdate,userUpdateComment}) => {

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
 
   <button className="btn btn-md btn-circle btn-ghost absolute right-1 " onClick={closeBox}>✕</button>
   
          <form className="fieldset mt-10" onSubmit={commentForUpdate ? handleSubmit(onCommentUpdate) : handleSubmit(onCommentadd)}>
              <textarea {...register("comment")} className="textarea w-3xs sm:w-xl xl:w-3xl" defaultValue={commentForUpdate ? commentForUpdate.comment : ""} name={"comment"} placeholder="comment"></textarea>
                <button className="btn dark:btn-info dark:text-white btn-neutral  btn-sm md:btn-md">
                  submit
                </button>
         </form>
   </div>
   
  )
}

export default CommentTextArea