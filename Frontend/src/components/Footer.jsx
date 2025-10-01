import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  return (
    // Outer container: Full width, white background, no top margin/padding
    <div className='w-full bg-white text-gray-800 mt-20'>
      
     
      <div 
        className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-[4fr_2fr_2fr] gap-12 py-16 px-6 sm:px-10'
      >
        
        {/* ------ Left Section (Logo and Description) ------ */}
        <div className='flex flex-col gap-4'>
         
          <div onClick={()=>{navigate('/');scrollTo(0,0)}} className='cursor-pointer'>

          <h1 className='text-4xl font-bold text-[#5f6FFF]'>Easy<span className='text-[#5f6FFF] text-4xl font-bold'>Med</span></h1>
          </div>
          <p className='text-sm leading-relaxed text-gray-600'>
            Your trusted platform for healthcare appointments. <br /> Find and book appointments with verified specialists <br /> quickly and securely. We simplify the process so you can <br />focus on your health.
          </p>
        </div>

        
        {/* ------ Center Section (Company Links) ------ */}
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-semibold text-gray-900'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-sm text-gray-600'>
            <li onClick={()=>{navigate('/');scrollTo(0,0)}}  className='hover:text-blue-600 cursor-pointer'>Home</li>
            <li onClick={()=>{navigate('/about');scrollTo(0,0)}}  className='hover:text-blue-600 cursor-pointer'>About us</li>
            <li onClick={()=>{navigate('/contact');scrollTo(0,0)}}  className='hover:text-blue-600 cursor-pointer'>Contact us</li>
            <li onClick={()=>{navigate('/');scrollTo(0,0)}}  className='hover:text-blue-600 cursor-pointer'>Privacy policy</li>
          </ul>
        </div>
        
        {/* ------ Right Section (Get in Touch) ------ */}
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-semibold text-gray-900'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-sm text-gray-600'>
            <li className='hover:text-blue-600'>+1-212-456-7890</li>
            <li className='hover:text-blue-600'>rohitsharma@gmail.com</li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section: Separate full-width, dark background */}
      <div className='w-full bg-gray-100 py-4'>
          <p className='text-center text-gray-500 text-xs'>
            Copyright 2024&copy; EasyMed - All Right Reserved.
          </p>
      </div>
      
    </div>
  )
}

export default Footer