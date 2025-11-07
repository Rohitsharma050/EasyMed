import express from 'express'
import { getProfile, registerUser, updateProfile, userLogin ,bookAppoitment, getAppointments, cancelAppointment} from '../controllers/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppoitment)
userRouter.get('/my-appointments',authUser,getAppointments)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
export default userRouter