import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
//api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.json({
        success: false,
        message: "Missing details",
      });
    }

    //validate email
    if (!validator.isEmail(email)) {
      res.json({
        success: false,
        message: "Enter a valid email",
      });
    }
    //validate password
    if (password.length < 8) {
      res.json({
        success: false,
        message: "Enter a strong password",
      });
    }

    const hashedPaaword = await bcrypt.hash(password, 12);
    const userData = {
      name,
      email,
      password: hashedPaaword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for user login

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        success: false,
        message: "Missing details",
      });
    }

    const dbUser = await userModel.findOne({ email });
    if (!dbUser) {
      return res.json({
        success: false,
        message: "User does not exist.",
      });
    }
    const isMatched = await bcrypt.compare(password, dbUser.password);
    if (isMatched) {
      const token = jwt.sign({ id: dbUser._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to get user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Fill all the fields" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "profile Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to book appointment

const bookAppoitment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    let slots_booked = docData.slots_booked;
    //checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      }
      else{
        slots_booked[slotDate].push(slotTime)
      }
    }
    else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,userData,
      docData,
      amount:docData.fees,
      slotTime,slotDate,
      date:Date.now()

    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slots data in docData

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({
      success:true,message:"Appointment Booked"
    })
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for getting user appointments
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.body
    const appointments = await appointmentModel.find({ userId })

    if (appointments.length === 0) {
      return res.json({
        success: false,
        message: "No appointments found"
      })
    }

    res.json({
      success: true,
      appointments
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

//api for cancel appointment
const cancelAppointment = async (req,res)=>{
  const {userId,appointmentId} = req.body
  const appointmentData = await appointmentModel.findById(appointmentId)
  //verify appointment user
  if(appointmentData.userId!=userId)
  {
    res.json({
      success:false,message:"Unauthorized action"
    })
  }
  await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
  //releasing doctor slot
  const {docId,slotDate,slotTime} = appointmentData
  const doctorData = await doctorModel.findById(docId)
  let slots_booked = doctorData.slots_booked
  slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e!==slotTime)
  await doctorModel.findByIdAndUpdate(docId,{slots_booked})
  res.json({success:true,message:"Appointment Cancelled"})
}
export { registerUser, userLogin, getProfile, updateProfile ,bookAppoitment,getAppointments,cancelAppointment};
