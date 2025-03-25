  import React from 'react'
  import Header from '../ui/rootLayout/Header'
  import Footer from '../ui/rootLayout/Footer'
  import { Outlet } from 'react-router-dom'
  import ScrollToTop from '../components/commonComponents/ScrollToTop'

  const RooyLayout = () => {
  return (
   <div className='flex flex-col min-h-[100vh] dark:bg-dark-bg'>
       <Header />
        <Outlet />
       <Footer />
       <ScrollToTop />,
   </div>
    )
  }

export default RooyLayout