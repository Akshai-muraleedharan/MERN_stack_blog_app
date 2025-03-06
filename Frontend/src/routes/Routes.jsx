import React, {lazy,Suspense} from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Loader from '../components/commonComponents/Loader'





const RooyLayout = lazy(() => import('../layout/RootLayout')) 
const Home = lazy(() => import('../pages/rootpage/Home')) 
const LoginPage = lazy(() => import('../pages/rootpage/LoginPage')) 
const SignupPage = lazy(() => import('../pages/rootpage/SignupPage')) 
const SingleListPage = lazy(() => import('../pages/rootpage/SingleListPage')) 

const AuthLayout = lazy(() => import('../layout/AuthLayout'))
const AuthHomePage = lazy(() => import('../pages/authpage/AuthHomePage')) 
const AuthSingleListPage = lazy(() => import('../pages/authpage/AuthSingleListPage')) 
const AuthCreateBlogPage = lazy(() => import('../pages/authpage/AuthCreateBlogPage')) 

export const router = createBrowserRouter([
  
    {
      path:"/",
      element:(
        <Suspense fallback={<Loader/>}>
      <RooyLayout />
      </Suspense>
      ),

      children:[
        {
            path:"",
            element: <Home />
        },
        {
          path:"/login",
          element:<LoginPage />
        },
        {
          path:"/signup",
          element:<SignupPage />
        },{
          path:"/blog/:id",
          element:<SingleListPage />
        }
        
      ]

  },
  {
    path:"/blog",
    element:( 
      <Suspense fallback={<Loader/>}>
      <ProtectedRoute>
          <AuthLayout />
      </ProtectedRoute>
      </Suspense>

    ),

    children:[
      {
        path:"",
        element: <AuthHomePage />
      },
      {
        path:"auth/:id",
        element:< AuthSingleListPage />
      },
      {
        path:"create-blog",
        element:<AuthCreateBlogPage />
      }
    ]


   }  
])