  import React from 'react'
  import {Link} from "react-router-dom"

  const DashBoardMostViewBlog = ({mostView}) => {
    return (
      <div className='shadow rounded mt-5'>  
        {mostView.length === 0 ? <p className='text-black dark:text-dark-smalls-text'>No Data Found</p> : <div className="overflow-x-auto">
    <table className="table dark:bg-dark-cards-bg">
      <thead>
          <tr className='dark:text-dark-smalls-text text-black'>
              <th></th>
              <th>Title</th>
              <th className='text-center'>Author</th>
              <th className='text-center'>Views</th>
          </tr>
        </thead>
            <tbody>
            {mostView.filter((item) => item.published === true).slice(0,5).map((item,index) => (
              <tr key={item._id}>
                <th className='dark:text-dark-smalls-text text-black'>{index + 1}</th>
                <td className='dark:text-dark-smalls-text text-black'><Link to={`/admin/blog/${item._id}`}>{item.title}</Link></td>
                <td className='dark:text-dark-smalls-text font-bold text-center text-black'>{item.author.username}</td>
                <td className='dark:text-dark-smalls-text font-bold text-center text-black'>{item.view}</td>
            </tr>
            ))}
            </tbody>
      </table>
    </div>}
  </div>
  )
}

export default DashBoardMostViewBlog