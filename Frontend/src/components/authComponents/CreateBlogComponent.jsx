    import React, { useMemo, useRef, useState } from 'react'
    import JoditEditor from 'jodit-react'
    import {useForm} from 'react-hook-form'
    import {ToastContainer,toast} from "react-toastify"
    import { authUpdateBlog } from '../../services/blogServices'
    import useAuthStore from '../../store/authStore'
    import useThemeStore from '../../store/themeStore'
    const CreateBlogComponent = ({blogCreate,fetchSinglePage,view,setView,fetchData,sanitizedContent,loading}) => {
    const {register,handleSubmit} = useForm()

        const editor = useRef(null);
        const [content, setContent] = useState('');
        const {theme} = useThemeStore()
        const SetUserNoToken = useAuthStore((state) => state.SetUserNoToken) 
        const [loadingUpdate, setLoadingUpdate] = useState(false)
        const config = useMemo(
            () => ({
                readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                placeholder: 'Start typings...',
                theme:theme,                   
            }),
            [theme]
        );

        // create blog
          const  onSubmit = (data) => {
          const formData = new FormData()
          formData.append("title",data.title)
          formData.append("image",data.image[0] )
          formData.append("category",data.category)
          formData.append("content",content)
        try {
            blogCreate(formData)
        } catch (error) {
            console.log(error)
            if(error?.response?.data.message === "no token"){
                SetUserNoToken(null)
            }
        }
    }

    //  this function for convert image url to image file
    const convertUrlToImage = async (imageUrl) => {
        let filename = "image.jpg"
        const response = await fetch(imageUrl)
        const blob = await response.blob()  
        const file = new File([blob],filename,{type:blob.type})
        return file
    }

    const editBlog = async (data) => {  
    const file = await convertUrlToImage(fetchData.image)
    const formData = new FormData() 
         formData.append("title",data.title)
         formData.append("image",  data.image[0] || file  )
         formData.append("category",data.category)
         formData.append("content",content || sanitizedContent) 
         try {
            setLoadingUpdate(true)
           await authUpdateBlog(formData,fetchData._id)
           toast.success("Blog Updated Successfully")
           setLoadingUpdate(false)
         } catch (error) {
            setLoadingUpdate(false)
            console.log(error)
            if(error?.response?.data.message === "no token"){
                SetUserNoToken(null)
            }
         }
    }

    const closeEditBlog = () => {
        setView(false)
        fetchSinglePage()
    }

        const category = ["HTML","CSS","JAVASCRIPT","REACT","EXPRESS","NODE","REDUX","ANGULAR","ZUSTAND"]
  return (
   <>
    <p className='relative'>
       {view ? <button className="btn btn-md btn-circle btn-ghost absolute right-0 top-1 dark:text-white dark:hover:bg-gray-400 " onClick={closeEditBlog} >✕</button> : null} 
    </p>
    <h1 className='text-center mt-10 font-semibold text-2xl dark:text-dark-heads'>{view ? "Update Blog" : "Create Blog"}</h1>
   <form className='mt-20 flex mb-20 flex-col'onSubmit={view ? handleSubmit(editBlog) : handleSubmit(onSubmit)} >
    
    <legend className="fieldset-legend dark:text-dark-smalls-text">Enter Blog Title</legend>
    <input type="text" className="input mb-5 w-full dark:bg-dark-inputs-bg dark:focus:border-dark-inputs-focus dark:text-dark-inputs-texts"  defaultValue={view ? fetchData.title : ""} {...register("title")} name="title" placeholder="Type here" />
    
    <legend className="fieldset-legend dark:text-dark-smalls-text">Add Image</legend>
    <input type="file" {...register("image")} name="image" className="file-input dark:bg-dark-inputs-bg dark:focus:border-dark-inputs-focus dark:text-dark-inputs-texts file-input-neutral mb-5 w-full" />

    <legend className="fieldset-legend dark:text-dark-smalls-text dark:focus:border-dark-inputs-focus" >Select Category</legend>
    <select defaultValue={"select"} {...register("category")} name="category" className="select dark:bg-dark-inputs-bg dark:text-dark-inputs-texts w-full mb-5">
    <option className={view ? "text-red-500" : ""} disabled={view ? "" : true}>{view ? fetchData.category.toUpperCase() : "Select"}</option>
        {view ? category.filter(item => item.toLowerCase() !== fetchData.category).map((item) => (
            <option key={item}>{item}</option>
        )) : category.map((item) => (
            <option key={item}>{item}</option>
        ))}
    </select>
    
    <legend className="fieldset-legend dark:text-white">Enter Blog Content</legend>
        <JoditEditor 
        ref={editor}
        value={view ? sanitizedContent :  content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
        
        />

    { view && <button disabled={loadingUpdate} className="btn dark:btn-primary text-white btn-neutral mt-5 ">{loadingUpdate ? "Loading..." : "Submit"}</button>}
    { view ? null :<button disabled={loading} className="btn dark:btn-primary hover:bg-gray-600 dark:border dark:border-dark-borders-color btn-neutral text-white mt-5">{loading ? "Loading..." : "Submit"}</button> }
        <ToastContainer /> 
      </form>
    </>
    )
  }

export default CreateBlogComponent