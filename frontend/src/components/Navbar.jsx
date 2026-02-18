import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const Navbar = () => {
    return (
        <nav className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-4 bg-white shadow-lg font-sans gap-4 md:gap-0">
        
            <div className="flex items-center gap-2.5 text-2xl font-bold text-gray-800 w-full md:w-auto justify-center md:justify-start">
                <img src={logo} alt="Review&Rate Logo" className="w-10 h-10 object-contain" />
                <span>
                    <span className="text-[#484848]">Review</span>
                    <span className="text-from-[#D100F3] to-[#002BC5]">&</span>
                    <span className="font-bold ">RATE</span>
                </span>
            </div>

         
            <div className="hidden md:block relative w-full md:w-[40%] max-w-[400px] my-2 md:my-0">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-2.5 pl-5 pr-10 border border-gray-300 rounded-md text-base outline-none focus:border-[#646cff] transition-colors duration-300"
                />

                <svg width="0" height="0" className="absolute">
                    <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="9.08%" stopColor="#D100F3" />
                        <stop offset="108.36%" stopColor="#002BC5" />
                    </linearGradient>
                </svg>

                <FiSearch
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer w-5 h-5"
                    style={{ stroke: "url(#searchGradient)" }}
                />
            </div>

           
            <div className="hidden md:flex gap-6 md:gap-12 w-full md:w-auto justify-center md:justify-end">
                <Link to="#" className="text-gray-800 font-medium hover:text-[#646cff] transition-colors">SignUp</Link>
                <Link to="#" className="text-gray-800 font-medium hover:text-[#646cff] transition-colors">Login</Link>
            </div>
        </nav>
    )
}

export default Navbar