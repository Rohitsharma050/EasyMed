import React from 'react'

export default function Footer() {
  return (
    <>
    <div className=' bg-blue-900'>
        <div className='flex justify-between py-10 px-10'>
        {/* first */}
        <div>
            <h1 className='text-3xl font-bold text-white'>EasyMed</h1>
            <p className='pt-4 text-zinc-1000'>
                Bringing smarter healthcare solutions to patients,<br /> doctors, and clinincs & hospitals with <br /> ease and affordability.
            </p>
        </div>
        {/* second */}
        <div>
        <h1 className='text-3xl font-bold text-white'>Quick Links</h1>

        <ul className='pt-4  text-zinc-1000'>
        <li className="hover:text-white transition-colors cursor-pointer">Home</li>
        <li className="hover:text-white transition-colors cursor-pointer">Service</li>
        <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
        <li className="hover:text-white transition-colors cursor-pointer">Success Stories</li>
        <li className="hover:text-white transition-colors cursor-pointer">Contact</li>

        </ul>
        </div>

        {/* third */}
        <div>
            <h1 className='text-3xl font-bold text-white'>Contact Us</h1>
            <p className='pt-4  text-zinc-1000'>
                Pukhrayan, Kanpur Dehat, Uttar Pradesh 209111 <br />
                +91 79915 15802 <br />
                hello@dulify.com</p>
        </div>
        </div>
        <div className='bg-blue-500 justify-center text-center pb-10 pt-5'>
            <p>© 2025 EasyMed. All rights reserved. Privacy Policy | Terms of Service</p>
        </div>
        </div>

    </>
  )
}
