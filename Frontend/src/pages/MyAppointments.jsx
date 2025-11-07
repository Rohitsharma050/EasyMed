import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'

export default function MyAppointments() {

  const {doctors,appointments,cancelAppointment,getDoctorData} = useContext(AppContext)
  
  return  (

    <div>
      <p  className='pb-3 mt-12 font-medium text-2xl text-zinc-700 border-b'>My Appointments</p>

      {(!appointments || appointments.length===0) ? 
      ( <p className='text-gray-500 mt-6'>No appointments booked yet.</p>)
      :
      appointments && (appointments.slice(0,3).map((item,index)=>(
        <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
          <div>
            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
          </div>
          <div className='flex-1 text-sm text-zinc-600'>
            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
            <p>{item.docData.speciality}</p>
            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
            <p className='text-xs'>{item.docData.address.line1}</p>
            <p className='text-xs'>{item.docData.address.line2}</p>
            <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
          </div>
          <div></div>
          <div className='flex flex-col gap-2 justify-end'>
           {!item.cancelled &&  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-green-600 hover:text-white transition-all duration-300'>Pay Online</button>}
           {!item.cancelled ? <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>:
           <button  className='text-sm text-white bg-red-600 text-center sm:min-w-48 py-2 border '>Cancelled</button>} 
          </div>
        </div>)
      ))}
    </div>
  )
}
