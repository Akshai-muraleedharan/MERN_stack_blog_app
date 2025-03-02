import React from 'react'
import { FaSearch } from "react-icons/fa";
const Hero = () => {
  return (
            <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
            <div className="max-w-md">
            <h1 className="text-4xl font-bold">Expand Your Skills</h1>
            <p className="py-6 ">
            Explore expert tips, trends, and tutorials to sharpen your coding skills.
            Start building innovative, responsive web experiences today.
            </p>
            <button className="btn btn-neutral item-center justify-center"><FaSearch /> Search</button>
            </div>
        </div>
        </div>
  )
}

export default Hero