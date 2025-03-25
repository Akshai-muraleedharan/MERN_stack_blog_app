  import useAuthStore from '../store/authStore'
  import { Navigate } from 'react-router-dom'

  const ProtectedRoute = ({children}) => {
    const { user } = useAuthStore()
  return user ? children : <Navigate to={"/login"}/>
  }

export default ProtectedRoute