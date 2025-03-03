import React from 'react'

const SingleBlogCard = () => {

    const content = "useState is a built-in hook that allows you to add state to functional components in React. State refers to the data or information that changes over time and affects the rendering of the component. For example, in a counter app, the current value of the counter is stored in the component's state."
  return (
    <>
      <div className="card  bg-base-200 w-[100%] card-sm shadow-md mb-5">
                <div className="card-body">
                  <h2 className="card-title">How work useState in react?</h2>
                  <p className='max-w-2xl text-[14px] text-gray-600 leading-6'>{content.slice(0,90) + "..."}</p>
                  <div className="flex justify-between items-center">
                 
                 <div className='flex gap-4'>
                 <span className="inline-flex justify-center text-gray-600 items-center flex-wrap py-1 px-3 font-semibold border rounded-md border-gray-200 ">
                  Like 0
                </span>

                  <span className="inline-flex justify-center text-gray-600 items-center flex-wrap py-1  px-3 font-semibold border rounded-md border-gray-200">
                    comment 0
                  </span>
                 </div>

                  <span >03-03-2025</span>
                  </div>
                </div>
            </div>

            {/* card2 */}

            <div className="card  bg-base-200 w-[100%] card-sm shadow-md mb-5">
                <div className="card-body">
                  <h2 className="card-title">How work useState in react?</h2>
                  <p className='max-w-2xl text-[14px]'>{content.slice(0,90) + "..."}</p>
                  <div className="flex justify-between items-center">
                 
                 <div className='flex gap-4'>
                 <span className="inline-flex justify-center items-center flex-wrap py-1 px-3 font-semibold border rounded-md border-gray-200 ">
                  Like 0
                </span>

                  <span className="inline-flex justify-center items-center flex-wrap py-1  px-3 font-semibold border rounded-md border-gray-200">
                    comment 0
                  </span>
                 </div>

                  <span >03-03-2025</span>
                  </div>
                </div>
            </div>

            {/* card 3 */}

            <div className="card  bg-base-200 w-[100%] card-sm shadow-md mb-5">
                <div className="card-body">
                  <h2 className="card-title">How work useState in react?</h2>
                  <p className='max-w-2xl text-[14px]'>{content.slice(0,90) + "..."}</p>
                  <div className="flex justify-between items-center">
                 
                 <div className='flex gap-4'>
                 <span className="inline-flex justify-center items-center flex-wrap py-1 px-3 font-semibold border rounded-md border-gray-200 ">
                  Like 0
                </span>

                  <span className="inline-flex justify-center items-center flex-wrap py-1  px-3 font-semibold border rounded-md border-gray-200">
                    comment 0
                  </span>
                 </div>

                  <span >03-03-2025</span>
                  </div>
                </div>
            </div>

            {/* card 4 */}

            <div className="card  bg-base-200 w-[100%] card-sm shadow-md mb-5">
                <div className="card-body">
                  <h2 className="card-title">How work useState in react?</h2>
                  <p className='max-w-2xl text-[14px] text-gray-600 leading-6'>{content.slice(0,90) + "..."}</p>
                  <div className="flex justify-between items-center">
                 
                 <div className='flex gap-4'>
                 <span className="inline-flex justify-center items-center flex-wrap py-1 text-gray-600 px-3 font-semibold border rounded-md border-gray-200 ">
                  Like 0
                </span>

                  <span className="inline-flex justify-center items-center flex-wrap py-1 text-gray-600  px-3 font-semibold border rounded-md border-gray-200">
                    comment 0
                  </span>
                 </div>

                  <span >03-03-2025</span>
                  </div>
                </div>
            </div>
          {/* end */}
    </>
  )
}

export default SingleBlogCard