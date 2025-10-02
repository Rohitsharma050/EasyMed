import React, { useState } from 'react'
import { assets } from "../assets/assets"

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: "Rohit Sharma",
    image: assets.profile_pic,
    email: "rohitsharma@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: "Male",
    dob: "2000-01-20"
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-28 h-28 rounded-full object-cover mb-4"
          src={userData.image}
          alt="profile"
        />
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="text-2xl font-semibold text-center border-b border-gray-300 focus:outline-none"
          />
        ) : (
          <h2 className="text-2xl font-semibold">{userData.name}</h2>
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
                      address: { ...prev.address, line1: e.target.value }
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
                      address: { ...prev.address, line2: e.target.value }
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

            {/* Action */}
      <div className="text-right">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="bg-[#5F6FFF] text-white px-4 py-2 rounded-full shadow hover:scale-105 transition-all "
          >
            Save Information
          </button>
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
