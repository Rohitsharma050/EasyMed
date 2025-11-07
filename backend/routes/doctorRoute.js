import express from 'express'
import { cancelAppointment, completeAppointment, docDashData, doctorList,doctorProfile,getDoctorAppointments,loginDoctor, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authDoctor, getDoctorAppointments)
doctorRouter.post('/cancel-appointment',authDoctor,cancelAppointment)
doctorRouter.post('/complete-appointment',authDoctor,completeAppointment)
doctorRouter.get('/doctor-DashData',authDoctor,docDashData)
doctorRouter.get('/doctor-profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)
export default doctorRouter