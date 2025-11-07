import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {
  const { appointments, cancelAppointment, completeAppointment, getDocDashData } =
    useContext(DoctorContext)
  const [tempApp, setTempApp] = useState([])

  useEffect(() => {
    if (appointments && appointments.length > 0) {
      const filtered = appointments.filter((e) => !e.cancelled)
      setTempApp(filtered)
    } else {
      setTempApp([])
    }
  }, [appointments])

  return (
    <div className='px-4 md:ml-55 sm:px-8 md:px-16 lg:px-20 mt-20 mb-10 min-h-screen'>
      <p className='pb-3 text-2xl font-semibold text-zinc-800 border-b border-gray-300'>
        My Appointments
      </p>

      {(!tempApp || tempApp.length === 0) ? (
        <p className='text-gray-500 mt-10 text-center italic min-h-[60vh]'>
          No appointments booked yet.
        </p>
      ) : (
        <div className='mt-8 space-y-6'>
          {tempApp.map((item, index) => (
            <div
              key={index}
              className='flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-100 p-4 sm:p-6 w-full max-w-6xl mx-auto'
            >
              {/* Patient Image */}
              <div className='flex items-center gap-4 w-full sm:w-auto'>
                <img
                  className='w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-indigo-50'
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <div className='sm:hidden mt-2'>
                  <p className='text-lg font-semibold text-zinc-800'>
                    {item.userData.name}
                  </p>
                  <p className='text-sm text-zinc-600'>
                    {item.slotDate} | {item.slotTime}
                  </p>
                </div>
              </div>

              {/* Appointment Info */}
              <div className='flex-1 w-full sm:ml-6 mt-4 sm:mt-0 text-sm text-zinc-600'>
                <p className='hidden sm:block text-lg font-semibold text-zinc-800'>
                  {item.userData.name}
                </p>

                <div className='flex flex-wrap items-center gap-2 mt-2'>
                  <p className='font-medium text-zinc-700'>Payment:</p>
                  {item.payment ? (
                    <span className='px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full border border-green-300'>
                      Online
                    </span>
                  ) : (
                    <span className='px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full border border-yellow-300'>
                      Cash
                    </span>
                  )}

                  <p className='font-medium text-zinc-700 ml-2'>DOB:</p>
                  <p>{item.userData.dob}</p>
                </div>

                <div className='mt-2 space-y-1'>
                  <p className='text-zinc-700 font-medium'>Address:</p>
                  <p className='text-xs text-zinc-500'>
                    {item.userData.address.line1}
                  </p>
                  <p className='text-xs text-zinc-500'>
                    {item.userData.address.line2}
                  </p>
                </div>

                <p className='mt-3 text-sm text-zinc-700 font-medium'>
                  Date & Time:{' '}
                  <span className='font-normal'>
                    {item.slotDate} | {item.slotTime}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div>

              </div>
              {item.isCompleted ? (
                <button className='text-sm md:ml-15 px-2 text-green-500 text-center sm:min-w-48 py-2 border border-green-600 mt-4 sm:mt-0'>
                  Completed
                </button>
              ) : (
                <div className='flex md:flex-col md:ml-15  gap-5  mt-4 sm:mt-0 w-full sm:w-auto'>
                  <button
                    onClick={() => {
                      completeAppointment(item._id)
                      getDocDashData()
                    }}
                    className='text-sm px-2 md:ml-15 text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300'
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-sm md:ml-15 px-2  text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel Appointment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DoctorAppointments
