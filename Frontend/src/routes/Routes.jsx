import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RooyLayout from '../layout/RootLayout'
import Home from '../pages/rootpage/Home'
import LoginPage from '../pages/rootpage/LoginPage'
import SignupPage from '../pages/rootpage/SignupPage'
import Test from '../pages/rootpage/Test'
import AuthLayout from '../layout/AuthLayout'
import AuthHomePage from '../pages/authpage/AuthHomePage'
import ProtectedRoute from './ProtectedRoute'



export const router = createBrowserRouter([
  
    {
      path:"/",
      element:<RooyLayout />,

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
        },
        {
          path:"/test",
          element:<Test/>
        }
      ]

  },
  {
    path:"/blog",
    element:( 
      <ProtectedRoute>
          <AuthLayout />
    </ProtectedRoute>

    ),

    children:[
      {
        path:"",
        element: <AuthHomePage />
      }
    ]


   }  
])