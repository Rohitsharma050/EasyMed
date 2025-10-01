import React from 'react'
import { useState } from 'react';
const Login = () => {

  const [state,setState] = useState('sign Up')
  const [email,setEmail] = useState('');
   const [password,setPassword] = useState(''); 
    const [name,setName] = useState('');

     const onSubmitHandler = async (event)=>{
      event.preventDefault();
     }
  return (
    <form className='min-h-[80vh] flex items-center' action="">
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-2xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>
          {state==='Sign Up'? "Create Account":"Login"}</p>
          
          <p>Please {state==='Sign Up'?'sign up ':"login"} to book Appointment</p>
          {
            state==="Sign Up" && <div className='w-full '>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name}  required/>
            </div>
          }
          
          <div className='w-full '>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email}  required/>
          </div>
          <div className='w-full '>
            <p>password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required />
          </div>
          <button className='bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base'>{state==='Sign Up'? "Create Account":"Login"}</button>
          {
            state==="Sign Up" ? <p>Already have an account? <span onClick={()=>setState('Login')}  className='text-[#5F6FFF] cursor-pointer underline'>Login here</span> </p>
            : <p>Create a new account? <span onClick={()=>setState('Sign Up')}  className='text-[#5F6FFF] cursor-pointer underline'>click here</span> </p>
          }
      </div>
    </form>
    
  )
}

export default Login