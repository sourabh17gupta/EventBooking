import React from 'react'
import { organiserendpoints } from '../../apis'
import toast from 'react-hot-toast'
import {setLoading,setOrganiserEvents} from '../../../redux/slices/OrganiserEvent'
import { apiConnector } from '../../apiconnector'
const {ORGANISER_EVENT_API} = organiserendpoints

function getOrganiserEventApi() {
    
    return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
       const response = await apiConnector("GET" , ORGANISER_EVENT_API);
       const data = response.data.response;
       if(!data){
        throw new Error(response.data.message|| "No data received")
       }

       dispatch(setOrganiserEvents(data))
       localStorage.setItem("organiserEvents", JSON.stringify(data))

    }
    catch(error){
      console.log("event fetching API ERROR............", error)
      toast.error(error?.response?.data?.message||"event fetching Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)

  }

}

export default getOrganiserEventApi