import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm();
  const navigate = useNavigate();
  const [isPatient, setIsPatient] = useState(true);
  const [errorMsg, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage("");
    // You would add your backend signup API call here
    try {
      const url = isPatient ? "http://localhost:5000/patient/register" : "http://localhost:5000/doctor/register";
      const response = await axios.post(url, data);
      console.log("Signup Successful", response.data);
      navigate('/login')
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(errorMessage);
    }

  };

  return (
    <>
      <div className='my-20 flex justify-center'>
        {/* Main container for the form and role selection */}
        <div className='text-center text-blue-500 font-bold text-3xl'>
          Register Here!
          
          {/* Role selection bar - keep this fixed width */}
          <div className='relative flex h-12 mt-6 border border-gray-300 rounded-full overflow-hidden w-[400px] mx-auto'>
            <button
              type="button"
              onClick={() => setIsPatient(true)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${isPatient ? 'text-white' : 'text-black'}`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setIsPatient(false)}
              className={`w-1/2 text-lg font-medium transition-all z-10 ${!isPatient ? 'text-white' : 'text-black'}`}
            >
              Doctor
            </button>
            <div
              className={`absolute top-0 h-full w-1/2 rounded-full bg-blue-500 transition-all ${isPatient ? 'left-0' : 'left-1/2'}`}
            ></div>
          </div>
        
          {/* Form container - make this wider */}
          <form onSubmit={handleSubmit(onSubmit)} className='pt-4 shadow-md rounded-md p-4 mt-4 w-[800px]'>
            {errorMsg && (
              <div className="text-red-500 text-sm text-center mb-4">
                {errorMsg}
              </div>
            )} 

            {/* Name and Email side-by-side */}
            <div className='flex flex-col md:flex-row w-full gap-4'>
              <div className='w-full'>
                <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder='Enter your Name'
                  {...register('name', { required: 'Enter your Name' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.name && <span className="text-red-500 text-sm text-left block mt-1">{errors.name.message}</span>}
              </div>
              <div className='w-full'>
                <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder='Enter your Email'
                  {...register('email', { required: 'Enter your Email' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.email && <span className="text-red-500 text-sm text-left block mt-1">{errors.email.message}</span>}
              </div>
            </div>

            {/* Password and Confirm Password side-by-side */}
            <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
              <div className='w-full'>
                <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder='Enter your Password'
                  {...register('password', {
                    required: 'Enter a valid Password',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.password && <span className="text-red-500 text-sm text-left block mt-1">{errors.password.message}</span>}
              </div>
              <div className='w-full'>
                <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder='Confirm Password'
                  {...register('confirmPassword', {
                    required: 'Please Confirm Your Password',
                    validate: (value) => value === getValues("password") || 'Passwords do not match'
                  })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 rounded-lg text-sm block w-full p-2.5 outline-blue-500'
                />
                {errors.confirmPassword && <span className="text-red-500 text-sm text-left block mt-1">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            {/* Phone number and age side-by-side */}
            <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
              <div className='w-full'>
                <label htmlFor="phone" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  placeholder='Enter your Phone Number'
                  {...register('phone', {
                    required: 'Enter your Phone Number',
                    minLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    },
                    maxLength: {
                      value: 10,
                      message: 'Phone number must be exactly 10 digits'
                    },
                    validate: (value) => !isNaN(value) || "Please enter a valid phone number"
                  })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.phone && <span className="text-red-500 text-sm text-left block mt-1">{errors.phone.message}</span>}
              </div>
              <div className='w-full'>
                <label htmlFor="age" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Age</label>
                <input
                  type="number"
                  id="age"
                  placeholder='Enter your Age'
                  {...register('age', { required: 'Enter your Age' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.age && <span className="text-red-500 text-sm text-left block mt-1">{errors.age.message}</span>}
              </div>
            </div>

            {/* Gender and state side-by-side */}
            <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
              <div className='w-full'>
                <label htmlFor="gender" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Gender</label>
                <select
                  id="gender"
                  {...register('gender', { required: 'Please select your gender' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm text-left block mt-1">{errors.gender.message}</span>}
              </div>
              <div className='w-full'>
                <label htmlFor="state" className='block mb-2 text-sm font-medium text-gray-900 text-left'>State</label>
                <input
                  type="text"
                  id="state"
                  placeholder='Enter your State'
                  {...register('state', { required: 'Enter your State' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.state && <span className="text-red-500 text-sm text-left block mt-1">{errors.state.message}</span>}
              </div>
            </div>

            {/* City and pincode side-by-side */}
            <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
              <div className='w-full'>
                <label htmlFor="city" className='block mb-2 text-sm font-medium text-gray-900 text-left'>City</label>
                <input
                  type="text"
                  id="city"
                  placeholder='Enter your City'
                  {...register('city', { required: 'Enter your City' })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.city && <span className="text-red-500 text-sm text-left block mt-1">{errors.city.message}</span>}
              </div>
              <div className='w-full'>
                <label htmlFor="pincode" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  placeholder='Enter your Pincode'
                  {...register('pincode', {
                    required: 'Enter your Pincode',
                    minLength: {
                      value: 6,
                      message: 'Pincode must be exactly 6 digits'
                    },
                    maxLength: {
                      value: 6,
                      message: 'Pincode must be exactly 6 digits'
                    },
                    validate: (value) => !isNaN(value) || "Please enter a valid pincode"
                  })}
                  className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                />
                {errors.pincode && <span className="text-red-500 text-sm text-left block mt-1">{errors.pincode.message}</span>}
              </div>
            </div>
            
            {/* Doctor-specific fields, shown when isPatient is false */}
            {isPatient === false && (
              <>
                <div className='flex flex-col md:flex-row w-full gap-4 mt-4'>
                  <div className='w-full'>
                    <label htmlFor="specialization" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Specialization</label>
                    <select
                      id="specialization"
                      {...register('specialization', { required: 'Please select a specialization' })}
                      className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                    >
                      <option value="">Select Specialization</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Oncologist">Oncologist</option>
                      <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    </select>
                    {errors.specialization && <span className="text-red-500 text-sm text-left block mt-1">{errors.specialization.message}</span>}
                  </div>
                  <div className='w-full'>
                    <label htmlFor="experience" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Experience (in years)</label>
                    <input
                      type="number"
                      id="experience"
                      placeholder='Enter your experience'
                      {...register('experience', {
                        required: 'Please enter your experience',
                        min: { value: 0, message: 'Experience must be a positive number' },
                        validate: (value) => !isNaN(value) || "Please enter a valid number"
                      })}
                      className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                    />
                    {errors.experience && <span className="text-red-500 text-sm text-left block mt-1">{errors.experience.message}</span>}
                  </div>
                </div>

                <div className='flex flex-col w-full mt-4'>
                  <label htmlFor="availability.days" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Availability</label>
                  <div className='flex flex-wrap gap-2 text-gray-700 text-sm mb-2'>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className='flex items-center gap-1'>
                        <input
                          type="checkbox"
                          id={`availability-day-${day}`}
                          value={day}
                          {...register('availability.days', { required: 'Please select at least one day' })}
                        />
                        <label htmlFor={`availability-day-${day}`}>{day}</label>
                      </div>
                    ))}
                  </div>
                  {errors.availability?.days && <span className="text-red-500 text-sm text-left block mt-1">{errors.availability.days.message}</span>}
                  
                  <label htmlFor="availability.time" className='block mb-2 text-sm font-medium text-gray-900 text-left'>Available Time</label>
                  <input
                    type="text"
                    id="availability.time"
                    placeholder='e.g., 9:00 AM - 5:00 PM'
                    {...register('availability.time', { required: 'Please enter your available time' })}
                    className='bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5 outline-blue-500'
                  />
                  {errors.availability?.time && <span className="text-red-500 text-sm text-left block mt-1">{errors.availability.time.message}</span>}
                </div>
              </>
            )}

            <button
              type="submit"
              className='w-full bg-green-500 mt-4 rounded-lg text-white font-medium p-2.5 hover:bg-blue-500 transition duration-300 text-[15px]'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
