  import React from 'react'

  const RadialProgress = ({upload}) => {
    return (
      <div className='min-h-screen flex justify-center items-center'>
          <div className="radial-progress text-primary" style={{ "--value": upload } } aria-valuenow={upload} role="progressbar">
          {upload + "%"}
          </div>
      </div>
    )
  }

  export default RadialProgress