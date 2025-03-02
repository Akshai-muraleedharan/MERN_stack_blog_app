import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RooyLayout from '../layout/RootLayout'
import Home from '../pages/rootpage/Home'



export const router = createBrowserRouter([
  
    {
      path:"/",
      element:<RooyLayout />,

      children:[
        {
            path:"",
            element: <Home />
        }
      ]

  },  
])