import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {Link} from "react-router-dom"
import useAuthStore from '../../store/authStore'

const SingleBlogCard = ({data,hasMore,fetchData}) => {

  const {user} = useAuthStore()

 
      const dateConvert = (datestr) => {
       const date = new Date(datestr)
      const formattedDate = date.toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
        });
            return formattedDate
      }
   
  return (
    <>
     <InfiniteScroll 
     dataLength={data.length} 
     next={fetchData} 
     hasMore={hasMore} 
     loader={<p className='flex justify-center'> <span className="loading loading-spinner loading-md mx-auto"></span></p>}
      endMessage={<p className='text-xs dark:text-white text-black text-center'>No more Data Found</p>} >
        {data.filter(item => item.published === true).map((item) => (
          <Link to={user ?`auth/${item._id}` :  `/blog/${item._id}`} key={item._id}>
           <div  className="card dark:bg-gray-950 bg-base-200 w-[100%] card-sm shadow-md mb-5 cursor-pointer">
           <div className="card-body">
             <h2 className="card-title  text-xl md:text-2xl dark:text-white hover:text-gray-500">{item.title}</h2>
             <div className="flex justify-between items-center">
            
            <div className='flex gap-4'>
            <span className="inline-flex justify-center dark:text-white text-gray-600 items-center flex-wrap py-1 px-3 font-semibold border rounded-md dark:border-gray-700 border-gray-200 ">
            { `Like ${item.likes}` }
           </span>

             <span className="inline-flex justify-center dark:text-white text-gray-600 items-center flex-wrap py-1  px-3 font-semibold border rounded-md dark:border-gray-700 border-gray-200">
               {`comment  ${item.comments.length}`}
             </span>
            </div>

             <span className='dark:text-white text-black'>{ dateConvert(item.createdAt.slice(5,10))}</span>
             </div>
           </div>
       </div>
       </Link>
        ))}

      </InfiniteScroll> 
          {/* end */}
    </>
  )
}

export default SingleBlogCard