import React from 'react'
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const SideCard = ({ mostView }) => {
  const { user } = useAuthStore()

  return (
    <div className='w-[30%] sticky top-3 xl:w-[25%]  dark:bg-dark-cards-bg bg-card_bg hidden md:flex rounded-md p-2 shadow-md h-96  flex-col justify-evenly '>
      {mostView.length === 0 ? <p className='flex justify-center'><span className="loading loading-spinner dark:bg-white bg-black loading-sm"></span></p> : <>
        <h2 className='ml-2 font-semibold dark:text-white text-base_text absolute top-2'>Most view</h2>
        <ul className=''>
          {mostView.slice(0, 3).map((item) => (
            <Link key={item._id} to={user ? `auth/${item._id}` : `/blog/${item._id}`}>
              <li className='px-2 py-2 hover:text-gray-500 dark:text-dark-paragraph dark:hover:text-dark-hovers-texts text-base_text cursor-pointer'>{item.title.slice(0, 50) + "..."}</li>
            </Link>
          ))}
        </ul>
      </>}
    </div>
  )
}

export default SideCard