import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { token, userData, logout } = useContext(AppContext)

  const handleLogOut = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative'>
      {/* Logo */}
      <div className='cursor-pointer' onClick={() => navigate('/')}>
        <h1 className='text-3xl sm:text-4xl font-bold text-[#5f6FFF]'>
          Easy<span className='text-[#5f6FFF]'>Med</span>
        </h1>
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/'>
          <li className='py-1 hover:text-[#5f6FFF] transition-all duration-200'>Home</li>
        </NavLink>
        <NavLink to='/doctors'>
          <li className='py-1 hover:text-[#5f6FFF] transition-all duration-200'>All Doctors</li>
        </NavLink>
        <NavLink to='/about'>
          <li className='py-1 hover:text-[#5f6FFF] transition-all duration-200'>About</li>
        </NavLink>
        <NavLink to='/contact'>
          <li className='py-1 hover:text-[#5f6FFF] transition-all duration-200'>Contact</li>
        </NavLink>
      </ul>

      {/* Right Side Buttons */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div
            className='flex items-center cursor-pointer gap-2 relative'
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            onMouseEnter={() => setShowProfileMenu(true)}
            
          >
            <img className='w-8 rounded-full' src={userData.image} alt='' />
            <img className='w-2.5' src={assets.dropdown_icon} alt='' />

            {/* Dropdown */}
            {showProfileMenu && (
              <div className='absolute top-12 right-0 bg-stone-100 flex flex-col rounded gap-4 p-4 text-base font-medium text-gray-600 z-20 shadow-md min-w-48'>
                <p
                  onClick={() => {
                    navigate('/my-profile')
                    setShowProfileMenu(false)
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/my-appointments', { replace: true })
                    setShowProfileMenu(false)
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    handleLogOut()
                    setShowProfileMenu(false)
                  }}
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-[#5f6FFF] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* Hamburger Icon for Mobile */}
        <div
          className='md:hidden flex flex-col gap-1 cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className='w-6 h-0.5 bg-gray-700'></span>
          <span className='w-6 h-0.5 bg-gray-700'></span>
          <span className='w-6 h-0.5 bg-gray-700'></span>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md rounded-b-md flex flex-col items-center gap-4 py-5 font-medium text-gray-700 md:hidden z-10'>
          <NavLink onClick={() => setShowMenu(false)} to='/'>
            <p className='hover:text-[#5f6FFF]'>Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors'>
            <p className='hover:text-[#5f6FFF]'>All Doctors</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about'>
            <p className='hover:text-[#5f6FFF]'>About</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact'>
            <p className='hover:text-[#5f6FFF]'>Contact</p>
          </NavLink>

          {!token && (
            <button
              onClick={() => {
                navigate('/login')
                setShowMenu(false)
              }}
              className='bg-[#5f6FFF] text-white px-6 py-2 rounded-full font-light'
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar
