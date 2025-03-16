import React from 'react'
import { Link} from 'react-router-dom'

const AuthUserBlogsList = ({postedBlog}) => {
  return (
    <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th className='text-center'>Views</th>
                    <th className='text-center'> Like</th>
              
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                 
                 {postedBlog.map((item,index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td><Link to={`/blog/user-profile/blog-data/${item._id}`} >{item.title.slice(0,60) + "...."}</Link></td>
                    <td className='text-center'>{item.view}</td>
                    <td className='text-center'>{item.likes}</td>
                
                    {item.published ? <td className="text-green-500">Approved</td> : <td className="text-red-500">Not Approved</td> }
                  </tr>
                 ))}
                  
                </tbody>
              </table>
              </div>
  )
}

export default AuthUserBlogsList