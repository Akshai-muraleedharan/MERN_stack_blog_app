import React, { useEffect, useState } from 'react'
import UserListTable from '../../components/adminComponents/dashboard/UserListTable'
import { authAdminUserDelete, userList } from '../../services/adminSevices'
import useAdminAuthStore from '../../store/adminStore'
import {toast,ToastContainer} from 'react-toastify'

const UserListPage = () => {

 const [currentPage,setCurrentPage] = useState(1)
 const [totalData,setTotalData] = useState(0)
 const [totalUsers ,setTotalUsers] = useState(0)
 const [userData,setUserData] = useState([])
 const [loading,setLoading] = useState(true)
 const [UserDeleteLoading,setUserDeleteLoading] = useState(false)
 
 

 const limit = 8

   const SetAdminNoToken = useAdminAuthStore((state) => state.SetAdminNoToken)

  const fetchUserList = async () => {
       try{
         const res = await userList(currentPage,limit)
         setUserData(res?.data)
         setTotalData(totalData + res?.userLength)
         setTotalUsers(res?.totalUsers)
         setLoading(false)
       }catch(error){
        console.log(error)
        setLoading(false)
        if(error?.response?.data.message === "no token"){
          SetAdminNoToken(null)
        }
       }
  }

    const deleteUser = async (id) => {
      try {
        setUserDeleteLoading(true)
        const res = await authAdminUserDelete(id)
        toast.success(res.message)
        fetchUserList()
        setUserDeleteLoading(false)
      } catch (error) {
        console.log(error)
        if(error?.response?.data.message === "no token"){
          SetAdminNoToken(null)
        }
        setUserDeleteLoading(false)
        
      }
    }

  const previousPage = () => {
    setCurrentPage( currentPage - 1)
    setTotalData(totalData - totalData)
  }

  const nextPage = () => {
    setCurrentPage( currentPage + 1)
  }


    useEffect(() => {

    fetchUserList()
    
    },[currentPage])

  return (
    <div className='px-5 dark:bg-dark-bg  md:px-10 lg:px-20 w-full mb-5 bg-[#f9f9f9]'>
        
        <h1 className='text-center text-2xl my-5 dark:text-dark-heads'>User List</h1>
       { loading ?  <p className='flex justify-center mt-4'><span className="loading loading-spinner dark:bg-dark-spinners-color loading-md"></span></p> 
        : <div> 
       <UserListTable UserDeleteLoading={UserDeleteLoading} ToastContainer={ToastContainer} deleteUser={deleteUser} userData={userData} fetchUserList={fetchUserList} setLoading={setLoading} />

           <div className=" mt-5 text-xs flex gap-5 justify-end">
        <button onClick={currentPage === 1 ? null : previousPage}  className={currentPage === 1 ? ' text-gray-500 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Previous </button>
        <button onClick={totalData === totalUsers ? null : nextPage} className={ totalData === totalUsers ?  ' text-gray-500 text-xs md:text-[16px]' : 'dark:text-white hover:text-blue-500 text-xs md:text-[16px] cursor-pointer'}>Next</button>
        </div>
        </div> }
    </div>
  )
}

export default UserListPage