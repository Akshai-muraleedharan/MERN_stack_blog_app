  import React from 'react'
  import SideCard from './SideCard'
  import SingleBlogCard from './SingleBlogCard'

  const BlogCard = ({dataFetch,hasMore,fetchData,mostView}) => {
  return (
    <>
    <h1 className='text-md md:text-2xl dark:text-dark-heads text-black'>Latest Post</h1>
          <div className='flex flex-col md:flex-row md:justify-between lg:justify-evenly gap-5  mx-auto mt-5'> 
          <div className={`w-full md:w-[60%] overflow-hidden flex flex-col ${dataFetch.length === 0 ? "justify-center": ""}`}>
          { dataFetch.length === 0  ? <p className='flex justify-center'><span className="loading loading-spinner dark:bg-dark-spinners-color bg-black loading-sm"></span></p> : <SingleBlogCard data={dataFetch} hasMore={hasMore} fetchData={fetchData}/>}
          </div>
           <SideCard mostView={mostView}/>
         </div>
    </>
  )
}

export default BlogCard