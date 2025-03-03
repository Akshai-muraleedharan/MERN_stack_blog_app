import React from 'react'
import SideCard from './SideCard'
import SingleBlogCard from './SingleBlogCard'

const BlogCard = () => {

  

  return (
    <>


    <h1 className='text-md md:text-2xl'>Latest Post</h1>

           <div className='flex flex-col md:flex-row md:justify-between lg:justify-evenly gap-5  mx-auto mt-5'> 

          <div className='w-full md:w-[60%] flex flex-col'>

           <SingleBlogCard />
          </div>

      

        <SideCard />
           </div>
    </>
  )
}

export default BlogCard