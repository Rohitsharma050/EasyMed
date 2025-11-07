import doctorModel from "../models/doctorModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get list of all doctors
const doctorList = async (req,res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to login doctor

const loginDoctor = async (req,res) => {
    try {
      const {email,password} = req.body
      if(!email || !password)
      {
        res.json({success:false,message:"Missing Required Fields"})
      }
      if(!validator.isEmail(email))
      {
        res.json({success:false,message:"Enter valid Email"})
      }

      const doctor = await doctorModel.findOne({email})
      if(!doctor)
      {
        res.json({success:false,message:"Invalid Credentials"})
      }
    const isMatched  = await bcrypt.compare(password,doctor.password)

      if(isMatched)
      {
        const dToken = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        res.json({success:true,dToken})
      }
      else
      {
        res.json({success:false,message:"Invalid Credentials"})
      }

      

    } catch (error) {
      console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
    }
}

//API to get doctor appointments for doctor panel

const getDoctorAppointments = async (req,res)=>{

  try {
    const {docId} = req.body
  const appointments = await appointmentModel.find({docId})
  
  if(!appointments || appointments.length === 0)
  {
    res.json({success:false,message:"No Appointment Found"})
  }
  
  res.json({
    success:true,appointments
  })
  
  } catch (error) {
       console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }

}

//api for cancel appointment by doctor
const cancelAppointment = async (req,res)=>{
  try {
    
    const {docId,appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    //verify appointment user
    if(appointmentData.docId!=docId)
    {
      res.json({
        success:false,message:"Unauthorized action"
      })
    }
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot
    const {slotDate,slotTime} = appointmentData
    const doctorData = await doctorModel.findById(docId)
    let slots_booked = doctorData.slots_booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e!==slotTime)
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:"Appointment Cancelled"})
  } catch (error) {
       console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

//api for marking the appointment as completed

const completeAppointment =  async (req,res)=>{
    try {
      
        const {docId,appointmentId} = req.body
        const appointment = await appointmentModel.findById(appointmentId)
        if(appointment.docId!=docId)
        {
           res.json({
        success:false,message:"Unauthorized action"
          })
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})    
        res.json({
          success:true,message:"Appointment Completed"
        })    
    } catch (error) {
          console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
    }
}
//api for getting doctor dashboard data
const docDashData = async (req,res)=>{
  try {
    const {docId} = req.body
  const appointments  = await appointmentModel.find({docId})
  let patients = []
  let totalEarning = 0
  appointments.forEach((item)=>{
    if(item.isCompleted===true)
    {
      totalEarning+=item.docData.fees
    }
    if(!patients.includes(item.userId))
    {
      patients.push(item.userId)
    }
  })
  const docDashData = {
    success:true,
    patients:patients.length,
    totalEarning,
    totalAppointments:appointments.length,
    latestAppointments:appointments.reverse().slice(0,5)
  }
  res.json({
    success:true,
    docDashData
  })
  } catch (error) {
         console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }

}
//api for getting doctor profile data

const doctorProfile = async (req,res)=>{
  try {
    const {docId} = req.body
    const profileData = await doctorModel.findById(docId)
    res.json({
      success:true,profileData
    })
  } catch (error) {
      console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
}

//api for updating doctor profile
  const updateDoctorProfile = async (req,res)=>{
    try {
        const {docId,address,fees,available} = req.body
        await doctorModel.findByIdAndUpdate(docId,{address,fees,available})
        res.json(
         { success:true,message:"Profile Updated"}
        )
    } catch (error) {
           console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
    }

}
export { changeAvailability, doctorList,loginDoctor,getDoctorAppointments,cancelAppointment, completeAppointment ,docDashData,
  doctorProfile,updateDoctorProfile
};
