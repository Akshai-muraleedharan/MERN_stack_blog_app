import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RooyLayout from '../layout/RootLayout'
import Home from '../pages/rootpage/Home'
import LoginPage from '../pages/rootpage/LoginPage'
import SignupPage from '../pages/rootpage/SignupPage'



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
        }
      ]

  },  
])