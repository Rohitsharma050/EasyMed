import { createContext, useEffect, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"
export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const currencySymbol = '$'
    const [doctors,setDoctors] = useState([])
    const [token ,setToken ] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [userData,setUserData] = useState(false)

    const [appointments,setAppointments] = useState([])
    const getDoctorsData  = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+ '/api/doctor/list')
            if(data.success)
            {
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/my-appointments',{headers:{token}})
        if(data.success)
        {
            setAppointments(data.appointments.reverse())
        }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const loadUserProfileData  = async () =>{
        try {
            const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
            if(data.success)
            {
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
            if(data.success)
            {
                toast.success(data.message)
                getAppointments()
                getDoctorsData()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const logout = () => {
  localStorage.removeItem('token')
  setToken(false)
  setUserData(false)
  setAppointments([]) 
}

      const value = {
        doctors,currencySymbol,token,setToken,backendUrl,userData,setUserData,loadUserProfileData,
        getDoctorsData,appointments,getAppointments,
        cancelAppointment,logout
    }
  
    useEffect(()=>{
        getDoctorsData()
    },[])
    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else
        {
            setUserData(false)
        }
    },[token])
      useEffect(()=>{
    if(token)
    {
      getAppointments()
    }
  },[token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider