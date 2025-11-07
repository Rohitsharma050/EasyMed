import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, cancelAppointment, token, getDashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getDashData();
    }
  }, [token]);

  return (
    dashData && (
      <div className="mt-20 mb-5 md:ml-55 px-4 sm:px-8 md:px-12 lg:px-16 min-h-screen">
        {/* Summary Cards */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-5 md:gap-6">
          {/* Doctors Card */}
          <div className="flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]">
            <img className="w-12 sm:w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-500 text-sm">Doctors</p>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]">
            <img className="w-12 sm:w-14" src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          {/* Patients Card */}
          <div className="flex items-center gap-3 bg-white p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:scale-[1.02] transition-all duration-300 w-full sm:w-[280px] md:w-[200px]">
            <img className="w-12 sm:w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white mt-10 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-200 bg-gray-50">
            <img src={assets.list_icon} alt="" className="w-5 h-5" />
            <p className="font-semibold text-gray-700 text-lg">
              Latest Bookings
            </p>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.length === 0 ? (
              <p className="text-gray-500 italic p-6 text-center">
                No recent bookings available.
              </p>
            ) : (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex  sm:flex-row items-start sm:items-center justify-between px-5 py-3 gap-4 hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Doctor Info */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover"
                      src={item.docData.image}
                      alt=""
                    />
                    <div className="text-sm sm:text-base">
                      <p className="text-gray-800 font-medium">
                        {item.docData.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item.slotDate} | {item.slotTime}
                      </p>
                    </div>
                  </div>

                  {/* Status / Button */}
                  <div className="flex  gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {item.cancelled ? (
                      <p className="text-sm pl-30 font-medium text-red-500">
                        Cancelled
                      </p>
                    ) : (
                      <button
                        onClick={() => {
                          cancelAppointment(item._id)
                          getDashData()
                        }}
                        className="text-sm ml-25 border border-gray-300 text-gray-600 px-3 py-1.5 hover:bg-red-600 hover:text-white transition-all duration-300"
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
  );
};

export default Dashboard;
