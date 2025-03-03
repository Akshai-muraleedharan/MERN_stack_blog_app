import React from 'react'
import Hero from '../../components/rootComponents/Hero'
import BlogCard from '../../components/rootComponents/BlogCard'


const Home = () => {
  return (
    <div>
        <Hero />
       <div className='px-5 md:px-10 w-full mb-5 bg-[#f9f9f9]'>
       <BlogCard />  
       </div>
    </div>
  )
}

export default Home