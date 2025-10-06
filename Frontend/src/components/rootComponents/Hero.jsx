import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore';

const Hero = () => {
  const { user } = useAuthStore()
  return (
    <div className="hero dark:bg-dark-bg bg-primary_bg min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl dark:text-dark-heads text-black font-bold">Expand Your Skills</h1>
          <p className="py-6 dark:text-dark-paragraph text-black">
            Explore expert tips, trends, and tutorials to sharpen your coding skills.
            Start building innovative, responsive web experiences today.
          </p>
          <Link to={user ? '/blog/search' : '/search'}> <button className="btn btn-neutral item-center  dark:text-white justify-center"><FaSearch /> Search</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Hero