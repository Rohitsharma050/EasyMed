// ✅ Navbar.jsx
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const [showMenu, setShowMenu] = useState(false)

  const logOut = () => {
    navigate('/login')
    if (token) {
      setToken('')
      localStorage.removeItem('token')
    }
    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
    setShowMenu(false)
  }

  return (
    <>
      <div className='flex justify-between w-full pt-4 sm:border fixed z-50 items-center px-4 sm:px-10 py-3 border-b border-b-[#DADADA] bg-white'>
        {/* Left Section: Logo + Role */}
        <div className='flex items-center gap-2 text-xs'>
          <div
            onClick={() => navigate('/')}
            className='cursor-pointer flex items-center gap-1'
          >
            <h1 className='text-3xl sm:text-4xl font-bold text-[#5f6FFF]'>
              Easy<span className='text-[#5f6FFF] font-bold'>Med</span>
            </h1>
          </div>
          <p className='border px-2.5 rounded-full py-0.5 border-gray-400 text-gray-600 sm:block'>
            {token ? 'Admin' : 'Doctor'}
          </p>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-4'>
          {/* Hamburger Icon (Visible only on small screens) */}
           <div
          className='md:hidden flex flex-col gap-1 cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className='w-6 h-0.5 bg-gray-700'></span>
          <span className='w-6 h-0.5 bg-gray-700'></span>
          <span className='w-6 h-0.5 bg-gray-700'></span>
        </div>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className='  bg-[#5F6FFF] text-white text-sm sm:text-md px-5 sm:px-6 py-2 rounded-full hover:bg-[#4c59e0] transition-all duration-300 hidden md:block'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Visible when hamburger is clicked) */}
      {showMenu && (
        <div className='absolute top-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col gap-4 text-gray-700 md:hidden z-40 w-56'>
          {token && (
            <>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/admin-dashboard'
              >
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/all-appointments'
              >
                Appointments
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/add-doctor'
              >
                Add Doctor
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/doctor-list'
              >
                Doctor List
              </NavLink>
            </>
          )}

          {dToken && (
            <>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/doctor-dashboard'
              >
                Dashboard
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/doctor-appointments'
              >
                Appointments
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                className='hover:text-[#5f6FFF]'
                to='/doctor-profile'
              >
                Profile
              </NavLink>
            </>
          )}

          <hr className='border-t border-gray-300' />
          <button
            onClick={logOut}
            className='bg-[#5F6FFF] text-white py-2 rounded-full hover:bg-[#4c59e0]'
          >
            Logout
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar
