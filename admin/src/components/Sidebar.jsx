// ✅ Sidebar.jsx
import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { token } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    // Hide sidebar on small screens
    <div className='hidden md:flex h-[100vh] fixed bg-white border-r border-gray-200 shadow-sm md:mt-11'>
      {/* Admin Sidebar */}
      {token && (
        <ul className='text-[#515151] mt-5 w-64'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/admin-dashboard'
          >
            <img src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/all-appointments'
          >
            <img src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/add-doctor'
          >
            <img src={assets.add_icon} alt='' />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/doctor-list'
          >
            <img src={assets.people_icon} alt='' />
            <p>Doctor List</p>
          </NavLink>
        </ul>
      )}

      {/* Doctor Sidebar */}
      {dToken && (
        <ul className='text-[#515151] mt-5 w-64'>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/doctor-dashboard'
          >
            <img src={assets.home_icon} alt='' />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/doctor-appointments'
          >
            <img src={assets.appointment_icon} alt='' />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-6 cursor-pointer ${
                isActive
                  ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]'
                  : 'hover:bg-gray-100'
              }`
            }
            to='/doctor-profile'
          >
            <img src={assets.people_icon} alt='' />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
