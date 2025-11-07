import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// Api for adding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    console.log(req.body);
    //check for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }
    // validating email format

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid Email",
      });
    }

    //validate strong password

    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //upload image to cloudinary

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      about,
      fees,
      speciality,
      experience,
      address: JSON.parse(address),
      date: Date.now(),
      degree,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({
      success: true,
      message: "Doctor added",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get all appointments for admin dashboard
const getAppointments = async(req,res)=>{
  try {
      const appointments = await appointmentModel.find({})
      if(!appointments || appointments.length===0)
      {
        res.json({success:false,message:"No appointment booked yet"})
      }
      res.json({success:true,appointments})
  } catch (error) {
     return res.json({
      success: false,
      message: error.message,
    });
  }
}

//api for cancel appointment by admin
const cancelAppointment = async (req,res)=>{
  try {
    
    const {appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)
    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
    //releasing doctor slot
    const docId = appointmentData.docId
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

//api for marking the appointment as completed by admin

const completeAppointment =  async (req,res)=>{
    try {
      
        const {appointmentId} = req.body
        const appointment = await appointmentModel.findById(appointmentId)
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

//api for geting data for admin dashboard

const adminDashboard = async (req,res)=>{

    const doctors = await doctorModel.find({})
    const users = await  userModel.find({})
    const appointments =await appointmentModel.find({})

    const dashData = {
      doctors:doctors.length,
      patients:users.length,
      appointments:appointments.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }

    res.json({
      success:true,dashData
    })
}
export { addDoctor, loginAdmin, allDoctors,getAppointments ,cancelAppointment,completeAppointment,adminDashboard};
