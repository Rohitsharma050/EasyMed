import {useEffect, useState,createContext } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'
export const DoctorContext = createContext()

const DoctorContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData] = useState(false)
    const [profileData ,setProfileData] = useState(false)
    const getDoctorAppointments = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/appointments',{headers: {dToken}
})
            if(data.success)
            {
                 setAppointments([...data.appointments].reverse()) 
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

        const cancelAppointment = async(appointmentId) => {
            try {
                const {data} = await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
                if(data.success)
                {
                    toast.success(data.message)
                    getDoctorAppointments()
                    getDocDashData()
                    
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
                
                const {data} = await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
                if(data.success)
                {
                    toast.success(data.message)
                    getDoctorAppointments()
                    getDocDashData()
                }
                else{
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }

        const getDocDashData = async ()=>{
            try {
            const {data} = await axios.get(backendUrl+'/api/doctor/doctor-dashData',{headers:{dToken}})
            if(data.success)
            {
                setDashData(data.docDashData)
                console.log(data.docDashData)
            }
            else{
                toast.error(data.message)
            }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }

         const getProfileData = async ()=>{
            try {
            const {data} = await axios.get(backendUrl+'/api/doctor/doctor-profile',{headers:{dToken}})
            if(data.success)
            {
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
            else{
                toast.error(data.message)
            }
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }

        }
        const updateDocProfile = async (updateData)=>{
            try {
            const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
            if(data.success)
            {
                toast.success(data.message)
                getProfileData()
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
        dToken,setDToken,backendUrl,appointments,setAppointments,getDoctorAppointments,cancelAppointment,completeAppointment,
        dashData,setDashData,getDocDashData,getProfileData,profileData,setProfileData,updateDocProfile
    }

    useEffect(()=>{
        if(dToken)
        {
            getDoctorAppointments()
        }
    },[dToken])
        useEffect(()=>{
        if(dToken)
        {
            getDocDashData()
        }
    },[dToken])
    return (
        <DoctorContext.Provider value = {value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider