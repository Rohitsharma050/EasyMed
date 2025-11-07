import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { DoctorContext } from '../../context/DoctorContext'

const AllAppointments = () => {
  const {
    appointments,
    cancelAppointment,
    completeAppointment,
    currencySymbol,
  } = useContext(AdminContext)
  const {} = useContext(DoctorContext)

  return (
    <div className='mt-20 md:ml-60 px-4 sm:px-8 md:px-16 min-h-screen mb-10'>
      <p className='pb-3 text-2xl sm:text-3xl font-semibold text-zinc-800 border-b border-gray-300'>
        Appointments
      </p>

      {/* If no appointments */}
      {!appointments || appointments.length === 0 ? (
        <p className='text-gray-500 mt-10 text-center italic'>
          No appointments booked yet.
        </p>
      ) : (
        <div className='mt-8 space-y-6'>
          {appointments
            // avoid mutating original array when reversing
            .reverse().slice(0,20) 
            .map((item, index) => (
              <div
                key={index}
               className='flex flex-col  sm:flex-row items-start sm:items-center justify-between bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg border border-gray-100 p-4 sm:p-6 mx-auto'

              >
                {/* Appointment Info */}
                <div className='flex-1 text-sm text-zinc-600 w-full'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2'>
                    <p className='text-lg font-semibold text-zinc-800'>
                      Patient:
                    </p>
                    <p className='text-lg text-zinc-600'>{item.userData.name}</p>
                  </div>

                  <div className='flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2'>
                    <p className='text-lg font-semibold text-zinc-800'>
                      Doctor:
                    </p>
                    <p className='text-lg text-zinc-600'>{item.docData.name}</p>
                  </div>

                  <div className='flex flex-wrap items-center gap-2 mt-2'>
                    <p className='font-medium text-zinc-700'>Payment:</p>
                    {item.payment ? (
                      <span className='px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full border border-green-300'>
                        Online
                      </span>
                    ) : (
                      <span className='px-2 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full border border-yellow-300'>
                        Cash
                      </span>
                    )}

                    <p className='font-medium text-zinc-700 ml-2'>Fees:</p>
                    <p className='text-green-600 font-bold'>
                      {currencySymbol}
                      {item.docData.fees}
                    </p>
                  </div>

                  <p className='mt-3 text-sm text-zinc-700 font-medium'>
                    Date & Time:{' '}
                    <span className='font-normal'>
                      {item.slotDate} | {item.slotTime}
                    </span>
                  </p>
                </div>

                {/* Buttons Section */}
                <div className='mt-4 sm:mt-0  sm:ml-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
                  {item.isCompleted ? (
                    <button className='text-sm text-green-600 border border-green-600  px-4 py-2 w-full sm:w-40 font-medium'>
                      Completed
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='text-sm border border-green-600 text-green-600  px-4 py-2 w-full sm:w-40 hover:bg-green-600 hover:text-white transition-all duration-300'
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='text-sm border border-red-600 text-red-600  px-4 py-2 w-full sm:w-40 hover:bg-red-600 hover:text-white transition-all duration-300'
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default AllAppointments
