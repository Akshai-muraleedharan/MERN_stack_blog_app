  import React, {useState } from 'react'
  import {useForm} from 'react-hook-form'
  import { searchBlog } from '../../services/blogServices'
  import SingleBlogCard from '../../components/rootComponents/SingleBlogCard'

  const SearchPage = () => {
  const {register,handleSubmit} = useForm()
  const [dataFetch,setFetchData] = useState([])
  const [hasMore,setHasMore] = useState(true)
  const [loading,setLoading] = useState(false)
  const [page,setPage] = useState(1)

  const fetchData = async (data) => {
    try {
      setLoading(true)
     const res = await searchBlog(data.title)
     if(res?.data.length === 0) {
      setHasMore(false)
    }
    setFetchData(res?.data)
    setPage((prevPage) => prevPage + 1)
    setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } 
  }
  return (
    <div className='px-5 dark:bg-dark-bg  md:px-10 lg:px-32 w-full mb-5 bg-[#f9f9f9]'>
        <h1 className='my-5 text-center text-md md:text-2xl dark:text-dark-heads' >Search Your Thought's</h1>
            <div className='mt-10 flex flex-col  md:flex-row justify-center gap-5' onChange={handleSubmit(fetchData)}>
                <input type='text' {...register('title')} name='title' placeholder='Search here...'  className='input w-full lg:w-[60%] xl:w-[50%] mx-auto dark:bg-dark-inputs-bg dark:text-dark-inputs-texts  dark:focus:border-dark-inputs-focus' />
            </div>
                <div className='mt-20 lg:w-[60%] xl:w-[50%] mx-auto'>
                    {loading ? <p className='flex justify-center'><span className='loading loading-spinner dark:bg-dark-spinners-color bg-black loading-sm'></span></p> : <SingleBlogCard data={dataFetch} hasMore={hasMore} page={page} fetchData={fetchData}/>}
                </div>
    </div> 
    )
  }

  export default SearchPage