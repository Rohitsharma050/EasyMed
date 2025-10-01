import React from 'react';
// Assuming you have an assets file with the image
// For this component, I'll assume the doctor image is at: assets.contact_img
import { assets } from '../assets/assets'; 

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white'>
      
      {/* -------------------- 1. Page Header -------------------- */}
      <div className='text-center mb-16'>
        <h1 className='text-2xl font-bold text-gray-700 uppercase tracking-widest'>
          CONTACT US
        </h1>
      </div>

      {/* -------------------- 2. Main Content Layout -------------------- */}
      <div className='flex flex-col md:flex-row gap-12 items-start'>
        
        {/* Left Side: Image */}
        {/* The image is slightly taller than the text block, giving it visual weight */}
        <div className='md:w-1/2'>
          {/* NOTE: Replace assets.contact_img with your actual image path */}
          <img 
            src={assets.contact_image} 
            alt="Doctor giving a vaccine" 
            className='w-[400px] h-auto rounded-lg shadow-lg'
          />
        </div>

        {/* Right Side: Contact Details and Careers */}
        <div className='md:w-1/2 text-gray-700 space-y-12'>

          {/* ----- Our Office Section ----- */}
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-3 uppercase'>
              Our Office
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              54709 Willms Station<br/>
              Suite 350, Washington, USA
            </p>
            <p className='text-gray-600 mt-4 leading-relaxed'>
              Tel: (415) 555-0132<br/>
              Email: rohitsharmasa120111@gmail.com
            </p>
          </div>

          {/* ----- Careers Section ----- */}
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-3 uppercase'>
              Careers at EasyMed
            </h2>
            <p className='text-gray-600 mb-6'>
              Learn more about our teams and job openings.
            </p>
            
            {/* Explore Jobs Button with Black Hover Effect */}
            <button className='px-8 py-3 border border-gray-400 text-gray-800 font-medium 
                               hover:bg-gray-900 hover:text-white transition-all duration-300'>
              Explore Jobs
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Contact