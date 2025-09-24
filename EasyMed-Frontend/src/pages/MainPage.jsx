import React from 'react'
import HomeNavbar from '../components/HomeNavbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import Overview from '../components/Overview.jsx'
import Patient from '../components/Patient.jsx'
import Steps from '../components/Steps.jsx'
import Doctor from '../components/Doctor.jsx'
import Feedback from '../components/Feedbacks.jsx'
export default function MainPage() {
  return (
    <>
    <HomeNavbar/>
    <div >
        <Outlet/>
      </div>
      <Overview/>
      <div className='flex justify-around'>
        <Patient/>
        <Doctor/>
      </div>
      
      <Steps/>
      <Feedback/>

    <Footer/>
    
    </>
  )
}
