import React from 'react'
import { Link} from 'react-router-dom'

const AuthUserBlogsList = ({postedBlog}) => {
  return (
    <div className="overflow-x-auto dark:bg-dark-cards-bg ">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th className='text-black dark:text-dark-smalls-text'>Title</th>
                    <th className='text-center text-black  dark:text-dark-smalls-text'>Views</th>
                    <th className='text-center text-black  dark:text-dark-smalls-text'> Like</th>
                    <th className='text-black  dark:text-dark-smalls-text'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                 
                 {postedBlog.map((item,index) => (
                  <tr key={item._id}>
                    <td className='text-black dark:text-dark-smalls-text'>{index + 1}</td>
                    <td className='text-black hover:text-gray-500 dark:text-dark-paragraph dark:hover:text-dark-hovers-texts'><Link to={`/blog/user-profile/blog-data/${item._id}`} >{item.title.slice(0,60) + "...."}</Link></td>
                    <td className='text-center text-black dark:text-dark-smalls-text'>{item.view}</td>
                    <td className='text-center text-black dark:text-dark-smalls-text'>{item.likes}</td>
                
                    {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td> }
                  </tr>
                 ))}
                  
                </tbody>
              </table>
              </div>
  )
}

export default AuthUserBlogsList