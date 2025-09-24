import React from 'react'

export default function Steps() {
  return (
    <>

  
        <div className='align-center bg-gray-100 w-full h-40 text-center'>
            <h1 className='flex justify-center text-5xl pt-10 font-bold'>How It <span className='text-blue-500 pl-2'>works</span></h1>
            <p>Effortlessly book, manage, and receive reminders for your appointments, all in one place.</p>
        </div>
        {/* Steps Section (Simple JSX, No Reusable Components) */}
      <div className="my-16 mb-20 flex justify-center space-x-8 max-w-5xl mx-auto">
        
  {/* Step 1 */}
  <div className="flex flex-col items-center justify-center space-y-5">
    <div className="bg-white h-20 w-20 rounded-full shadow-md border text-center pt-5 text-2xl border-gray-200">1.</div>
    <div className="bg-white px-6 py-5 rounded-2xl shadow-md border border-gray-200 w-60 h-60 text-center flex flex-col justify-center">
      <h3 className="text-xl font-bold text-gray-900">Register</h3>
      <p className="text-gray-600 mt-2 text-sm">
        Patients can create an account to book appointments. Doctors can register to manage their schedule.
      </p>
    </div>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center justify-center space-y-5">
    <div className="bg-white h-20 w-20 rounded-full shadow-md border text-center pt-5 text-2xl border-gray-200">2.</div>
    <div className="bg-white px-6 py-5 rounded-2xl shadow-md border border-gray-200 w-60 h-60 text-center flex flex-col justify-center">
      <h3 className="text-xl font-bold text-gray-900">Book / Manage Appointments</h3>
      <p className="text-gray-600 mt-2 text-sm">
        Patients can browse doctors and book available slots. Doctors can view and manage their appointments easily.
      </p>
    </div>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center justify-center space-y-5">
    <div className="bg-white h-20 w-20 rounded-full shadow-md border text-center pt-5 text-2xl border-gray-200">3.</div>
    <div className="bg-white px-6 py-5 rounded-2xl shadow-md border border-gray-200 w-60 h-60 text-center flex flex-col justify-center">
      <h3 className="text-xl font-bold text-gray-900">Notifications & Reminders</h3>
      <p className="text-gray-600 mt-2 text-sm">
        Patients receive reminders for upcoming appointments. Doctors get alerts for new bookings or cancellations.
      </p>
    </div>
  </div>

  {/* Step 4 */}
  <div className="flex flex-col items-center justify-center space-y-5">
    <div className="bg-white h-20 w-20 rounded-full shadow-md border text-center pt-5 text-2xl border-gray-200">4.</div>
    <div className="bg-white px-6 py-5 rounded-2xl shadow-md border border-gray-200 w-60 h-60 text-center flex flex-col justify-center">
      <h3 className="text-xl font-bold text-gray-900">Go Live!</h3>
      <p className="text-gray-600 mt-2 text-sm">
        Patients can start using EasyMed to manage their health. Doctors can efficiently handle their appointments and patients.
      </p>
    </div>
  </div>
</div>


  <div class="bg-blue-500 mt-10 text-white py-10 mb-20">
  <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    <div>
      <h2 class="text-4xl font-extrabold">100+</h2>
      <p class="text-lg mt-2">Doctors Available</p>
    </div>
    <div>
      <h2 class="text-4xl font-extrabold">95%</h2>
      <p class="text-lg mt-2">Retention Rate</p>
    </div>
    <div>
      <h2 class="text-4xl font-extrabold">10K+</h2>
      <p class="text-lg mt-2">Patients Managed</p>
    </div>
    <div>
      <h2 class="text-4xl font-extrabold">24/7</h2>
      <p class="text-lg mt-2">Support Available</p>
    </div>
  </div>
</div>



    </>
  )
}
