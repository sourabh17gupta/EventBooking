import React from 'react'
import { userendpoints } from '../../apis'
import toast from 'react-hot-toast'
import { setAttendeeEvent,setLoading } from '../../../redux/slices/AttendeeEvent'
import { apiConnector } from '../../apiconnector'
const {USER_EVENT_API} = userendpoints

function GetAttendeeEventApi() {
    
    return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
       const response = await apiConnector("GET" , USER_EVENT_API);
       const data = response.data.response;

        console.log("Ticket response:",response);
       if(!data){
        throw new Error(response.data.message|| "No data received")
       }

       dispatch(setAttendeeEvent(data))
       localStorage.setItem("AttendeeEvent", JSON.stringify(data))

    }
    catch(error){
      console.log("event fetching API ERROR............", error)
      toast.error(error?.response?.data?.message||"event fetching Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)

  }

}

export default GetAttendeeEventApi
