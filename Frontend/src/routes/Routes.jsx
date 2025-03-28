  import React, {lazy,Suspense} from 'react'
  import { createBrowserRouter } from 'react-router-dom'
  import ProtectedRoute from './ProtectedRoute'
  import Loader from '../components/commonComponents/Loader'
  import ProtectedRouteAdmin from './ProtectedRouteAdmin'
  import ErrorPage from '../components/commonComponents/ErrorPage'
  import AboutPage from '../pages/rootpage/AboutPage'
  import ContactPage from '../pages/rootpage/ContactPage'

  const RooyLayout = lazy(() => import('../layout/RootLayout')) 
  const Home = lazy(() => import('../pages/rootpage/Home')) 
  const LoginPage = lazy(() => import('../pages/rootpage/LoginPage')) 
  const SignupPage = lazy(() => import('../pages/rootpage/SignupPage')) 
  const SingleListPage = lazy(() => import('../pages/rootpage/SingleListPage')) 
  const SearchPage = lazy(() => import('../pages/rootpage/SearchPage')) 

  const AuthLayout = lazy(() => import('../layout/AuthLayout'))
  const AuthHomePage = lazy(() => import('../pages/authpage/AuthHomePage')) 
  const AuthSingleListPage = lazy(() => import('../pages/authpage/AuthSingleListPage')) 
  const AuthCreateBlogPage = lazy(() => import('../pages/authpage/AuthCreateBlogPage')) 
  const AuthListPageContent = lazy(() => import('../pages/authpage/AuthListPageContent')) 
  const AuthProfilePage = lazy(() => import('../pages/authpage/AuthProfilePage')) 
  const AuthSearchPage = lazy(() => import('../pages/authpage/AuthSearchPage')) 

  const AdminLayout = lazy(() => import('../layout/AdminLayout')) 
  const AdminHomePage = lazy(() => import('../pages/authAdminPage/AdminHomePage')) 
  const AdminLogin = lazy(() => import('../pages/rootpage/AdminLogin')) 
  const UserListPage = lazy(() => import('../pages/authAdminPage/UserListPage')) 
  const BlogListPage = lazy(() => import('../pages/authAdminPage/BlogListPage')) 
  const AdminSinglePage = lazy(() => import('../pages/authAdminPage/AdminSinglePage')) 
  const AdminCreateNewUser = lazy(() => import('../pages/authAdminPage/AdminCreateNewUser')) 
  const AdminBlogCreate = lazy(() => import('../pages/authAdminPage/AdminBlogCreate')) 

export const router = createBrowserRouter([
  
  {
    path:"*",
    element:<ErrorPage />
  },
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
        },
        {
          path:"/blog/:id",
          element:<SingleListPage />
        },
        {
          path:"/admin/login",
          element:<AdminLogin />
        },
        {
          path:'/search',
          element:<SearchPage />
        },
        {
          path:'/about',
          element:<AboutPage />
        },
        {
          path:'/contact',
          element:<ContactPage />
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
      },
      {
        path:"user-profile",
        element:<AuthProfilePage />
      },
      {
        path:"/blog/user-profile/blog-data/:id",
        element:<AuthListPageContent />
      },
      {
        path:"search",
        element:<AuthSearchPage />
      }
    ]


   } ,
   {
    path:"/admin",
    element:(
      <ProtectedRouteAdmin>
        < AdminLayout />
      </ProtectedRouteAdmin>
      ),

    children:[
      {
        path:"",
        element: <AdminHomePage />
      },
      {
        path:"userlist",
        element:<UserListPage />
      },
      {
        path:"bloglist",
        element:<BlogListPage />
      },
      {
        path:"blog/:id",
        element:<AdminSinglePage />
      },
      {
        path:"user/create",
        element:<AdminCreateNewUser />
      },
      {
        path:"blog/create",
        element:<AdminBlogCreate />
      }
    ]
   } 
])