  import React from 'react'
  import SideCard from './SideCard'
  import SingleBlogCard from './SingleBlogCard'

  const BlogCard = ({dataFetch,hasMore,fetchData,mostView}) => {
  return (
    <>
    <h1 className='text-md md:text-2xl dark:text-dark-heads text-black'>Latest Post</h1>
<<<<<<< HEAD
          <div className='flex flex-col  relative md:flex-row md:justify-between lg:justify-evenly gap-5  mx-auto mt-5'> 
=======
          <div className='flex flex-col  md:flex-row md:justify-between lg:justify-evenly gap-5  mx-auto mt-5'> 
>>>>>>> 38b743bbf6d763fbd0360fd6f6efa8e7b0c4e1c4
          <div className={`w-full md:w-[60%]  flex flex-col ${dataFetch.length === 0 ? "justify-center": ""}`}>
          { dataFetch.length === 0  ? <p className='flex justify-center'><span className="loading loading-spinner dark:bg-dark-spinners-color bg-black loading-sm"></span></p> : <SingleBlogCard data={dataFetch} hasMore={hasMore} fetchData={fetchData}/>}
          </div>
           <SideCard mostView={mostView}/>
         </div>
    </>
  )
}

export default BlogCard
