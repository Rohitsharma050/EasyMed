import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
export default function Login({ isLogin, onClose }) {
  if (!isLogin) {
    return null;
  }
  const Navigate = useNavigate();
  const [errorMsg,setErrorMessage] = useState("");
  const [isPatient, setIsPatient] = useState(false);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  // This function is now called only when the form is valid.
  const onSubmit = async (data) => {
    // The 'data' object contains the values from the registered inputs.
    // console.log("Form data:", data);
    // You can now send this data to your backend API.
    // For example:
    // setUser(data); // Assuming setUser is a prop or context function
    
    // The original `handleSubmit` logic is now within this function.
    // Replace `setUser({ username, password })` with `data`
    // The `username` and `password` fields are now `email` and `password` from the form.
    // You would typically call an API login function here:
    data.isPatient = isPatient;
    try {
      const url = isPatient ? "http://localhost:5000/patient/login" : "http://localhost:5000/doctor/login";
      const response = await axios.post(url,data)
      console.log("Login Successful",response.data);
      onClose(); // Close the modal on successful login
    } catch (error) {

      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      
      console.error("Login failed:", errorMessage);
      setErrorMessage(errorMessage)
    }
  };

  return (
    <>
      <div className='fixed inset-0 z-50 flex justify-center items-center'>
        <div onClick={() => onClose()} className='absolute inset-0 bg-black/50 backdrop-blur-sm'></div>
        
        <div className='flex-col-reverse rounded-2xl p-6 w-[400px] z-10 justify-center text-3xl bg-white text-center'>
          <button onClick={() => onClose()} className='z-10 flex text-gray-500 text-2xl place-self-end'>x</button>
          <h1 className='text-blue-500 font-bold'>Welcome Back</h1>
          <p className='text-sm pt-2'>Login to access your dashboard</p>

          {/* Select Role */}
          <div className='relative flex h-12 mt-6 border border-gray-300 rounded-full overflow-hidden'>
            <button onClick={() => setIsPatient(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isPatient ? "text-white" : "text-black"}`}>
              Patient
            </button>
            <button onClick={() => setIsPatient(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isPatient ? "text-white" : "text-black"}`}>
              Doctor
            </button>
            <div className={`absolute top-0 h-full w-1/2 rounded-full bg-blue-500 ${isPatient ? "left-0" : "left-1/2"}`}></div>
          </div>

          {/* Form */}
          <form className='pt-5' onSubmit={handleSubmit(onSubmit)}>
            {errorMsg && (
              <div className="text-red-500 text-sm text-center mb-4">
                {errorMsg}
            </div>)} 
            <div>
              <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Username</label>
              <input 
                type="email" 
                placeholder='Enter your email' 
                id='email' 
                {...register('email', { required: 'Email is required' })} 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-blue-500"
              />
              {errors.email && <span className="text-red-500 text-sm text-left block mt-1">{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor="password" className='text-sm text-left text-gray-900 font-medium block pt-3 mb-2'>Password</label>
              <input 
                type="password" 
                id='password' 
                placeholder='Enter your password'
                {...register('password', { required: 'Password is required' })}
                className='bg-gray-50 rounded-lg border border-gray-300 text-sm text-gray-900 block w-full p-2.5 outline-blue-500'
              />
              {errors.password && <span className="text-red-500 text-sm text-left block mt-1">{errors.password.message}</span>}
            </div>
            
            <button type="submit" className='w-full bg-green-600 mt-15 rounded-lg text-white font-medium p-2 hover:bg-blue-500 transition duration-300 text-[15px]'>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}