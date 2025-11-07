import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props)=>{

    const [dashData,setDashData] = useState(false)
    const [doctors,setDoctors] = useState([])
    const currencySymbol = '$'
     const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
     const [appointments,setAppointments] = useState([])
     const backendUrl = import.meta.env.VITE_BACKEND_URL
      const getAllDoctors = async ()=>{
        const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{token}})
        if(data.success){
            
             setDoctors(data.doctors)
             console.log(data.doctors)
             
        }
        else{
            toast.error(data.message)
        }
    }

    const changeAvailability = async (docId) =>{
        try {
            const {data} = await axios.post(backendUrl+ '/api/admin/change-availability',{docId},{headers:{token}})
            if(data.success)
            {
                toast.success(data.message)
                getAllDoctors()
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAppointments =async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/appointments',{headers:{token}})
            data.appointments = data.appointments.filter(e=>!e.cancelled)
            if(data.success)
            {
                toast.success(data.message)
                setAppointments(data.appointments)
                console.log(data.appointments)
            }
        } catch (error) {
             toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) => {
            try {
                const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{token}})
                if(data.success)
                {
                    toast.success(data.message)
                    getAppointments()
                    
                }
                else{
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
        
        const getDashData = async ()=>{

          try {
              const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{token}})
            if(data.success)
            {
                setDashData(data.dashData)
                console.log(data.dashData)
            }
            else{
                toast.error(data.message)
            }
          } catch (error) {
            console.log(error)
                toast.error(error.message)
          }

        }

        const completeAppointment =  async (appointmentId)=>{
            try {
                
                const {data} = await axios.post(backendUrl+'/api/admin/complete-appointment',{appointmentId},{headers:{token}})
                if(data.success)
                {
                    toast.success(data.message)
                    getAppointments()
                    getDashData()
                }
                else{
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }

    const value = {
        token,setToken,backendUrl,doctors,getAllDoctors,
        changeAvailability,getAppointments,appointments,setAppointments,cancelAppointment,completeAppointment,currencySymbol
        ,setDashData,dashData,getDashData

    }

    useEffect(()=>{
        if(token)
        {
            getAppointments()
        }
    },[token])
   
    return (
        <AdminContext.Provider value = {value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
