import React from 'react'

export default function Overview() {
  return (
    <>
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="0.5" d="M0,192L34.3,170.7C68.6,149,137,107,206,122.7C274.3,139,343,213,411,245.3C480,277,549,267,617,240C685.7,213,754,171,823,138.7C891.4,107,960,85,1029,106.7C1097.1,128,1166,192,1234,218.7C1302.9,245,1371,235,1406,229.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg> */}
        <div className='bg-gray-100 pb-10 pt-10'>

            
            <h1 className='flex justify-center text-5xl font-bold pb-3'>Manage All your </h1>
            <span className='flex justify-center text-5xl text-blue-500 font-bold'>Appointments Here</span>
        </div>

        <div className='flex justify-around bg-gray-50 py-20 '>
            <div >

            <h1 className='text-2xl font-bold text-green-600 pb-4'>Skip the Wait. <br /> Book Online</h1>
            <p className='text-gray-500'>Secure your appointment in minutes, <br /> not hours. Our streamlined platform  <br /> makes finding and booking a doctor  <br /> easier than ever</p>
            </div>

            <div>

            <h1 className='text-2xl font-bold text-teal-600  pb-4'>Book appointments. <br />Not frustration.</h1>
            <p className='text-gray-500'>Say goodbye to long hold times <br /> and missed calls. Find your perfect time slot <br /> and book instantly, any time of day.</p>
            </div>

            <div>

            <h1 className='text-2xl font-bold text-purple-700 pb-4'>Your Health, <br /> On Your Schedule.</h1>
            <p className='text-gray-500'>We put you in control. <br />Effortlessly manage appointments  and <br /> view health records from anywhere, <br /> so you can focus on what matters most.</p>
            </div>
            
        </div>
    </>
  )
}
