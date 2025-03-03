import React from 'react'

const SideCard = () => {
  return (

    <div className='w-[30%] xl:w-[20%] hidden md:block rounded-md p-2 shadow-md h-96'>
    <h2 className='ml-2 font-semibold'>Most view</h2>
        <ul>
            <li className='px-2 py-3 hover:text-gray-500 cursor-pointer'>What is JSX in React components?</li>
            <li className='px-2 py-3 hover:text-gray-500 cursor-pointer'>How does React use state management?</li>
            <li className='px-2 py-3 hover:text-gray-500 cursor-pointer'>What are React hooks and examples?</li>
            <li className='px-2 py-3 hover:text-gray-500 cursor-pointer'>How do you handle React events?</li>
            <li className='px-2 py-3 hover:text-gray-500 cursor-pointer'>What is the purpose of React's useEffect?</li>
        </ul>
    </div>
   
  )
}

export default SideCard