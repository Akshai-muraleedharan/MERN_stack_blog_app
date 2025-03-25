  import React, { useState } from 'react'
  import useAdminAuthStore from '../../../store/adminStore'
  import { blogDelete } from '../../../services/adminSevices'

  const UserListTable = ({userData,fetchUserList,UserDeleteLoading,ToastContainer,deleteUser}) => {
  const [postedBlog,setPostedBlog] = useState([])
  const [loading,setLoadingDelete] = useState(false)
  const [userId,setUserId] = useState("")
  const {admin} = useAdminAuthStore()
  const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)
  const deleteBlog = async (id) => {
            try {
              setLoadingDelete(true)
               await blogDelete(id)                 
               const deleteBlog = postedBlog.filter((item) => item._id !== id)
               setPostedBlog(deleteBlog)
               fetchUserList()
               setLoadingDelete(false)
            } catch (error) {
              console.log(error)
              if(error?.response?.data.message === "no token"){
                SetAdminNoToken(null)
              }
              setLoadingDelete(false)
            }
   }
   
 const openModel = (id) => {
 document.getElementById('my_modal_3').showModal()
 const user = userData.find((item) => item._id === id) 
    setPostedBlog(user.postedBlogs)
    setUserId(user._id)
 }

 const userDelete = () => {
  deleteUser(userId)
  setTimeout(() => {
      document.getElementById('my_modal_3').close()
    },2000)
  }

  return (
        <>
    { userData.length === 0 ? <p className='dark:text-dark-texts-color'>no data Go back</p> :  <div>
        <div className="overflow-x-auto ">
      <table className="table dark:bg-dark-cards-bg">
        <thead>
          <tr className='dark:text-dark-smalls-text'>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.sort((a,b) => a._id === admin._id ? -1 : 1).map((item,index) => (
            <tr key={item._id}>
            <td className='dark:text-dark-smalls-text text-black'>{index + 1}</td>
            <td className='dark:text-dark-smalls-text text-black'>{item.username}</td>
            <td className='dark:text-dark-smalls-text text-black'>{item.email}</td>
            <td className='dark:text-dark-smalls-text text-black'>{item.isAdmin ? "Admin" : "User"}</td>
            <td>{item.isAdmin  ? "Nil" : <button className="text-red-500 cursor-pointer" onClick={() => openModel(item._id)}>Delete</button>}</td>
          </tr>
          ))}         
        </tbody>
      </table>
    </div>
    </div>}
    <dialog id="my_modal_3" className="modal">
      <div className={postedBlog.length === 0 ? "modal-box dark:bg-dark-cards-bg" : "modal-box w-11/12 max-w-5xl dark:bg-dark-cards-bg"}>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute dark:text-dark-smalls-text right-2 top-2">✕</button>
        </form>
        <p className='text-start my-5 dark:text-dark-paragraph'>{postedBlog.length === 0 ? "Are You sure To Delete this User ?" : "Are You sure To Delete this User First Delete Blogs ?" } </p>
          {postedBlog.length === 0 ? "" :  <div className="overflow-x-auto">
          {loading ? <div className='flex justify-center'>
              <span className="loading loading-spinner loading-xs"></span>
                   </div> : <table className="table">
            <thead>
              <tr className='dark:text-dark-smalls-text'>
                <th></th>
                <th>Title</th>
                <th>Status</th>
                <th>Delete Blog</th>
              </tr>
            </thead>
            <tbody>
             { postedBlog.map((item,index) => (
               <tr key={item._id }>
               <td className='dark:text-dark-smalls-text text-black'>{index + 1}</td>
               <td className='dark:text-dark-paragraph text-black'>{item.title.slice(0,50) + "..."}</td>
               {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td>}
               <td><button className="text-red-500 cursor-pointer" onClick={() => deleteBlog(item._id)}>Delete</button></td>
             </tr>
             ))}
            </tbody>
          </table>}
        </div> }
        {postedBlog.length === 0 ? <div className='flex justify-end'>
          <button onClick={userDelete} className='btn btn-error text-white'>{UserDeleteLoading ? <span className="loading loading-spinner loading-xs"></span> : "Delete"}</button>
        </div> : ""}
      </div>
    </dialog>
    <ToastContainer /> 
    </>
    )
  }

export default UserListTable