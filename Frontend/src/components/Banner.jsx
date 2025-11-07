import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const Banner = () => {

  const navigate = useNavigate()
  const {token} = useContext(AppContext)
  return (
    // FIX 1: Corrected background color hex notation and added a stronger box-shadow for visual depth
    <div className='flex bg-[#5F6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-xl'>
        
        {/* ------Left side (Text & Button)------- */}
        <div className='flex-1 sm:py-10 md:py-16 lg:py-24 lg:pl-5 py-8'> 

            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white' >
                <p>Book Appointments</p>
                <p>With 100+ Trusted Doctors</p>
            </div>
            
            {/* FIX 3: Added styling to the button to make it visible and interactive */}
            {token ?<button onClick={()=>{scrollTo(0,0);navigate('/doctors') ;}} className='py-3 px-8  bg-white text-gray-600 sm:text-base rounded-full mt-6 hover:scale-105 transition-all '>
                Book Appointment
            </button>:
            <button onClick={()=>{navigate('/login')}} className='py-3 px-8  bg-white text-gray-600 sm:text-base rounded-full mt-6 hover:scale-105 transition-all '>
                Create Account
            </button>}

        </div>

        {/* ------Right side (Image)------- */}
        {/* FIX 2: Fixed the non-standard width: changed 'lg:w-[370]' to 'lg:w-[370px]' */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            {/* max-w-md is redundant on the image since the parent div has a fixed or proportional width */}
            <img className='w-full absolute bottom-0 right-0' src={assets.appointment_img} alt="Doctor with tablet" />
        </div>
    </div>
  )
}

export default Banner