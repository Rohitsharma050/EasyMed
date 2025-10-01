import React from 'react';
// Assuming you have an assets file with the image
// For this component, I'll assume the doctor image is at: assets.about_doctors_img
import { assets } from '../assets/assets'; 

const About = () => {
  return (
    <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8'>
      
      {/* -------------------- 1. About Us Header -------------------- */}
      <div className='text-center mb-16'>
        <h1 className='text-2xl font-bold text-gray-900 uppercase tracking-widest'>
          About Us
        </h1>
      </div>

      {/* -------------------- 2. Main Content & Image Section -------------------- */}
      <div className='flex flex-col md:flex-row gap-10 items-start mb-20'>
        
        {/* Left Side: Image */}
        <div className='md:w-1/2'>
          {/* NOTE: Replace assets.about_doctors_img with your actual image path */}
          <img 
            src={assets.about_image} 
            alt="Two doctors smiling" 
            className='w-[400px] h-auto rounded-lg shadow-xl'
          />
        </div>

        {/* Right Side: Text Content */}
        <div className='md:w-1/2 text-gray-700 space-y-6 text-base'>
          <p className='leading-relaxed'>
            Welcome To <span className='font-semibold text-blue-600'>EasyMed</span>, Your Trusted Partner in Managing Your Healthcare Needs Conveniently and Efficiently. At EasyMed, We Understand The Challenges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.
          </p>

          {/* Highlighted Section */}
          <p className='leading-relaxed p-4 border-l-4 border-blue-600 bg-blue-50/50'>
            <span className='font-semibold text-blue-600'>EasyMed is Committed to Excellence in Healthcare Technology.</span> We Continuously Strive to Enhance Our Platform, Integrating The Latest Advancements to Improve User Experience and Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care, <span className='font-semibold text-blue-600'>EasyMed Is Here to Support You Every Step Of The Way.</span>
          </p>

          {/* Our Vision Section */}
          <h2 className='text-xl font-semibold text-gray-900 pt-2'>
            Our Vision
          </h2>
          <p className='leading-relaxed'>
            Our Vision At <span className='font-semibold text-blue-600'>EasyMed is to Create a Seamless Healthcare Experience for Every User.</span> We Aim to Bridge the Gap Between Patients And Healthcare Providers, Making It Easier For You To Access The Care You Need, When You Need It.
          </p>
        </div>
      </div>

      {/* -------------------- 3. Why Choose Us Section -------------------- */}
      <div className='mt-16'>
        <h2 className='text-3xl font-bold text-gray-900 text-center mb-12'>
          WHY CHOOSE US
        </h2>
        
        {/* Three Column Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-300'>
          
          {/* Column 1: EFFICIENCY */}
          <div className='p-8 border-r border-gray-300'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wider'>
              EFFICIENCY:
            </h3>
            <p className='text-gray-600'>
              Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.
            </p>
          </div>
          
          {/* Column 2: CONVENIENCE */}
          <div className='p-8 md:border-r border-gray-300'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wider'>
              CONVENIENCE:
            </h3>
            <p className='text-gray-600'>
              Access To A Network Of Trusted Healthcare Professionals In Your Area.
            </p>
          </div>
          
          {/* Column 3: PERSONALIZATION */}
          <div className='p-8'>
            <h3 className='text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wider'>
              PERSONALIZATION:
            </h3>
            <p className='text-gray-600'>
              Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default About