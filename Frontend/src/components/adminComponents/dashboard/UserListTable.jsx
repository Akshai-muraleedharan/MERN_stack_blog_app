import React, { useState } from 'react'
import useAdminAuthStore from '../../../store/adminStore'
import { blogDelete } from '../../../services/adminSevices'

const UserListTable = ({userData,fetchUserList,setLoading}) => {

  const [postedBlog,setPostedBlog] = useState([])
  const [loading,setLoadingDelete] = useState(false)
   const {admin} = useAdminAuthStore()

   console.log(postedBlog)

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
              setLoadingDelete(false)
            }
   }
   

 const openModel = (id) => {
  document.getElementById('my_modal_3').showModal()

    const user = userData.find((item) => item._id === id) 
    setPostedBlog(user.postedBlogs)
 }


  return (
        <>
        <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {userData.sort((a,b) => a._id === admin._id ? -1 : 1).map((item,index) => (
            <tr key={item._id}>
            <th>{index + 1}</th>
            <td>{item.username}</td>
            <td>{item.email}</td>
            <td>{item.isAdmin ? "Admin" : "User"}</td>
            <td>{item.isAdmin  ? "Nil" : <button className="text-red-500 cursor-pointer" onClick={() => openModel(item._id)}>Delete</button>}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>

    <dialog id="my_modal_3" className="modal">
      <div className={postedBlog.length === 0 ? "modal-box" : "modal-box w-11/12 max-w-5xl"}>
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        
        <p className='text-start my-5'>{postedBlog.length === 0 ? "Are You sure To Delete this User ?" : "Are You sure To Delete this User First Delete Blogs ?" } </p>
          {postedBlog.length === 0 ? "" :  <div className="overflow-x-auto">
          {loading ? <div className='flex justify-center'>
              <span className="loading loading-spinner loading-xs"></span>
                   </div> : <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Status</th>
                <th>Delete Blog</th>
              </tr>
            </thead>
            <tbody>
             
             { postedBlog.map((item,index) => (
               <tr key={item._id }>
               <th>{index + 1}</th>
               <td>{item.title.slice(0,50) + "..."}</td>
               {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td>}
               <td><button className="text-red-500 cursor-pointer" onClick={() => deleteBlog(item._id)}>Delete</button></td>
             </tr>
             ))}
             
              
            </tbody>
          </table>}
        </div> }

        {postedBlog.length === 0 ? <div className='flex justify-end'>
          <button className='btn btn-error text-white'>Delete</button>
        </div> : ""}
      </div>
    </dialog>
    </>

  )
}

export default UserListTable