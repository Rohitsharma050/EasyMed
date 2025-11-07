import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (!userData) return <div className="text-center py-10">Loading profile...</div>

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image">
           <div className="relative cursor-pointer flex justify-center">
    <img
      className="w-36 h-36 rounded-full object-cover opacity-80"
      src={image ? URL.createObjectURL(image) : userData.image}
      alt="profile"
    />
    {!image && (
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          className="w-8 opacity-80"
          src={assets.upload_icon}
          alt="upload icon"
        />
      </div>
    )}
  </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <div className="flex justify-center">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={userData.image}
              alt="profile"
            />
          </div>
        )}

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-2xl font-semibold text-center border-b border-gray-300 focus:outline-none mt-3"
          />
        ) : (
          <h2 className="text-2xl font-semibold mt-3">{userData.name}</h2>
        )}
      </div>

      <hr className="mb-6" />

      {/* Contact Info */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">
          Contact Information
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Email id: </span>
            {userData.email}
          </p>

          <p>
            <span className="font-semibold">Phone: </span>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border px-2 py-1 rounded ml-2"
              />
            ) : (
              userData.phone
            )}
          </p>

          <p>
            <span className="font-semibold">Address: </span>
            {isEdit ? (
              <div className="mt-1 space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
            ) : (
              <span>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Basic Info */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-600 uppercase mb-3">
          Basic Information
        </h3>
        <div className="grid grid-col-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p>
            <span className="font-semibold">Gender: </span>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border px-2 py-1 rounded ml-2 max-w-30 bg-gray-100"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>

          <p>
            <span className="font-semibold">Birthday: </span>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border px-2 py-1 rounded ml-2"
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-right">
        {isEdit ? (

          <div >

            <button
              onClick={()=>{setIsEdit(false); loadUserProfileData() } }
              className="bg-red-600 mr-2 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all "
            >
              Cancel
            </button>
            <button
            onClick={updateUserProfileData}
            className="bg-[#5F6FFF] text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all "
          >
            Save Information
          </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-gray-700 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition-all "
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
