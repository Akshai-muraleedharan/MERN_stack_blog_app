import React, { useState } from 'react'

const BlogListTable = ({blogsData,setFindOneBlog,setOpenCommentTable,setFindBlog}) => {

   
  const [oneBlog,setOneBlog] = useState({})

   
// console.log(oneBlog)

    const dateConvert = (item) => {
        const date = new Date(item)    
        const formattedDate = date.toLocaleString('en-US',{
            dateStyle:"long",    
        });
        const  [month,day,year] = formattedDate.split(" ")
            return `${day} ${month} ${year}`
      }

      const openComment = (id) => {
          const findBlog = blogsData.find((item) => item._id === id)

          setFindBlog(findBlog)
          setFindOneBlog(findBlog.comments)
          setOpenCommentTable(true)
      }

      const openBlogModel = (id) => {
         document.getElementById('my_modal_1').showModal()
         const  blog = blogsData.find((item) => item._id === id) 
         setOneBlog(blog)

      }


  return (

    <div>
            <div className="overflow-x-auto">
            <table className="table table-sm">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Likes</th>
                    <th>comments</th>
                    <th>Views</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                
               {blogsData.map((item,index) => (
                 <tr key={item._id}>
                 <th>{index + 1}</th>
                 <td >{item.author.username}</td>
                 <td>{item.title.slice(0,40) +"..."}</td>
                 <td>{item.category}</td>
                 <td className='text-center font-semibold'>{item.likes}</td>
                 <td className='text-center font-semibold'>{item.comments.length > 0 ? <button onClick={() => openComment(item._id)} className='btn btn-xs btn-outline btn-accent cursor-pointer'>{item.comments.length}</button> : item.comments.length}</td>
                 <td className='text-center font-semibold'>{item.view}</td>
                 <td>{ dateConvert(item.createdAt.slice(0,10))}</td>
                 <td>{ dateConvert(item.updatedAt.slice(0,10))}</td>
                 {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td>}
                 <td><button className="text-red-500 cursor-pointer" onClick={() => openBlogModel(item._id)}>Delete</button></td>
             </tr>
               ))}
               
                
                </tbody>
            </table>
        </div>

       

        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <form method="dialog">
              
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <p className="py-4">Are you Sure To Delete This Blog  ?</p>
                
                <h3 className="font-bold text-lg">{oneBlog.title}</h3>
                 <div className='flex justify-end'>
                    <button  className="btn btn-xs btn-neutral md:btn md:btn-error ">Delete</button>
                    </div>
            </div>
        </dialog>
</div>
  )
}

export default BlogListTable