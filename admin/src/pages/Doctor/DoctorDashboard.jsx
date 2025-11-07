import React, { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const { dashData, cancelAppointment, getDocDashData } =
    useContext(DoctorContext)

  return (
    dashData && (
      <div className='mt-20 md:ml-55 px-4 sm:px-8 md:px-12 lg:px-20 min-h-screen mb-10'>
        {/* Summary Cards Section */}
        <div className='flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6'>
          {/* Patients */}
          <div className='flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]'>
            <img className='w-12 sm:w-14' src={assets.doctor_icon} alt='' />
            <div>
              <p className='text-xl font-semibold text-gray-700'>
                {dashData.patients}
              </p>
              <p className='text-gray-500 text-sm'>Patients</p>
            </div>
          </div>

          {/* Appointments */}
          <div className='flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]'>
            <img
              className='w-12 sm:w-14'
              src={assets.appointment_icon}
              alt=''
            />
            <div>
              <p className='text-xl font-semibold text-gray-700'>
                {dashData.totalAppointments}
              </p>
              <p className='text-gray-500 text-sm'>Appointments</p>
            </div>
          </div>

          {/* Earnings */}
          <div className='flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]'>
            <img className='w-12 sm:w-14' src={assets.patients_icon} alt='' />
            <div>
              <div className='flex items-center'>
                <p className='text-xl font-semibold text-gray-700'>$</p>
                <p className='text-xl font-semibold text-gray-700 ml-1'>
                  {dashData.totalEarning}
                </p>
              </div>
              <p className='text-gray-500 text-sm'>Total Earning</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className='bg-white mt-10 border border-gray-200 shadow-sm rounded-lg overflow-hidden'>
          {/* Header */}
          <div className='flex items-center gap-2.5 px-5 py-4 border-b border-gray-200 bg-gray-50'>
            <img src={assets.list_icon} alt='' className='w-5 h-5' />
            <p className='font-semibold text-gray-700 text-lg'>
              Latest Bookings
            </p>
          </div>

          {/* Bookings List */}
          <div className='divide-y divide-gray-100'>
            {dashData.latestAppointments.length === 0 ? (
              <p className='text-gray-500 italic p-6 text-center'>
                No recent bookings available.
              </p>
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className='flex sm:flex-row items-start sm:items-center justify-between px-5 py-3 gap-4 hover:bg-gray-50 transition-all duration-200'
                >
                  {/* Patient Info */}
                  <div className='flex items-center gap-4 w-full sm:w-auto'>
                    <img
                      className='rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover'
                      src={item.userData.image}
                      alt={item.userData.name}
                    />
                    <div className='text-sm sm:text-base'>
                      <p className='text-gray-800 font-medium'>
                        {item.userData.name}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        {item.slotDate} | {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* Status or Button */}
                  <div className='flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end'>
                    {item.cancelled ? (
                      <p className='text-sm pl-30 font-medium text-red-500'>
                        Cancelled
                      </p>
                    ) : item.isCompleted ? (
                      <p className='text-sm pl-30 font-medium text-green-500'>
                        Completed
                      </p>
                    ) : (
                      <button
                        onClick={() => {
                          cancelAppointment(item._id)
                          getDocDashData()
                        }}
                        className='text-sm ml-30 text-gray-600 border border-gray-300 px-3 py-1.5 hover:bg-red-600 hover:text-white transition-all duration-300'
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorDashboard
