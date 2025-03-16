import React from 'react'

const Loader = () => {
  return (
    <div className='min-h-screen flex flex-col dark:bg-black justify-center items-center'>
           <span className="loading loading-dots dark:bg-white loading-xl"></span>
           <p className='text-center'>Loading...</p>
    </div>
  )
}

export default Loader