import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <>
      <div className='flex flex-col items-center gap-4 my-10 sm:my-16 text-gray-900 px-4 sm:px-6 md:px-10'>
        {/* Title */}
        <h1 className='text-2xl sm:text-3xl font-medium text-center'>
          Top Doctors to Book
        </h1>
        <p className='text-sm sm:text-base text-center text-gray-600 max-w-md'>
          Simply browse through our extensive list of trusted doctors.
        </p>

        {/* Doctors Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 mt-6'>
          {doctors.slice(0, 10).map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-8px] transition-all duration-300 bg-white'
            >
              <img
                className='bg-blue-50 w-full h-48 sm:h-56 object-cover'
                src={item.image}
                alt=''
              />
              <div className='p-3 sm:p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-base sm:text-lg font-medium'>
                  {item.name}
                </p>
                <p className='text-gray-600 text-sm sm:text-base'>
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className='mt-8 sm:mt-10'>
          <button
            onClick={() => {
              navigate('/doctors')
              scrollTo(0, 0)
            }}
            className='bg-blue-50 text-gray-700 px-10 sm:px-12 py-2.5 sm:py-3 rounded-full font-medium hover:bg-blue-100 transition-all duration-300'
          >
            More
          </button>
        </div>
      </div>
    </>
  )
}

export default TopDoctors
