import React from 'react'
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const SideCard = ({mostView}) => {

   const {user} = useAuthStore()
  return (

    <div className='w-[30%] xl:w-[20%] hidden md:flex rounded-md p-2 shadow-md h-96  flex-col justify-evenly '>
    <h2 className='ml-2 font-semibold'>Most view</h2>
        <ul className=''>
        {mostView.slice(0,4).map((item) => (
          <Link key={item._id}  to={user ?`auth/${item._id}` :  `/blog/${item._id}`}>
            <li className='px-2 py-2 hover:text-gray-500 cursor-pointer'>{item.title.slice(0,50) + "..."}</li>
          </Link>
        ))}
           
            
        </ul>
    </div>
   
  )
}

export default SideCard