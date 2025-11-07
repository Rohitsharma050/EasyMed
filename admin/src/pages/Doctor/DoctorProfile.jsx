import React, { useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
const DoctorProfile = () => {
  const {dToken,profileData,setProfileData,getProfileData,updateDocProfile} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)
  const [isEdit,setIsEdit] = useState(false)
  useEffect(()=>{
    if(dToken)
    {
      getProfileData()
    }
  },[dToken])

  const updateProfile = async ()=>{
    try {
      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      updateDocProfile(updateData)
      setIsEdit(false)
        getProfileData()
      
    } catch (error) {
      
    }
  }
  return profileData && (
    <div className='md:ml-75 mt-20'>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-[#5f6FFF]/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* Doc Info : name,degree,experienc */}
          <p className='flex items-center text-3xl text-gray-700 font-medium '>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          {/* Doc about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 '>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>

          </div>
<p className='text-gray-600 font-medium mt-4'>
  Appointment fee: <span className='text-gray-800'>
    {currency}{' '}
    {isEdit ? (
      <input
        type="number"
        value={profileData.fees}
        onChange={(e) =>
          setProfileData((prev) => ({ ...prev, fees: e.target.value }))
        }
        className="border rounded px-1 py-1 w-20"
      />
    ) : (
      profileData.fees
    )}
  </span>
</p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" name="" id="" onChange={(e)=>{setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}}  value={profileData.address.line1} className="border rounded px-1 py-1 mb-2"/> :profileData.address.line1}
              <br />
               {isEdit ? <input type="text" name="" id="" onChange={(e)=>{setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}}  value={profileData.address.line2} className="border rounded px-1 py-1 "/> :profileData.address.line2}
            </p>
            
            
          </div>
          <div className='flex gap-1 pt-2'>
            <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox"  />
            <label htmlFor="">Available</label>
          </div>
          {
            isEdit?
            <div className='flex gap-4'>
              <button onClick={updateProfile} className='bg-[#5f6FFF] text-white px-6 py-2 mt-2 rounded-full shadow hover:scale-105 transition-all '>Save Information</button>
              <button onClick={()=>setIsEdit(false)} className='bg-red-600 text-white px-6 py-2 mt-2 rounded-full shadow hover:scale-105 transition-all '>Cancel</button>
            </div>
            :<button onClick={()=>{setIsEdit(true)}} className='bg-gray-700 text-white px-6 py-2 mt-2 rounded-full shadow hover:scale-105 transition-all'>Edit</button>
          }
          
          
        </div>

      </div>

    </div>
  )
}

export default DoctorProfile