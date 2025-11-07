import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, token, getAllDoctors, changeAvailability } =
    useContext(AdminContext)

  useEffect(() => {
    if (token) {
      getAllDoctors()
    }
  }, [token])

  return (
    <div className='mb-5 mt-20 px-4 sm:px-8 md:ml-60 lg:ml-80 max-h-[90vh] overflow-y-auto'>
      <p className='text-2xl border-b border-gray-300 pb-5 font-medium'>
        All Doctors
      </p>

      {/* Responsive container for doctor cards */}
      <div className='w-full flex flex-wrap justify-center sm:justify-start gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            key={index}
            className='border border-indigo-200 rounded-xl w-full sm:w-[46%] md:w-[30%] lg:w-[22%] max-w-64 overflow-hidden cursor-pointer group transition-all duration-300'
          >
            <img
              className='bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500 w-full h-40 object-cover'
              src={item.image}
              alt=''
            />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type='checkbox'
                  checked={item.available}
                />
                <p>available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
