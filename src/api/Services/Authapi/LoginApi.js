
import { toast } from "react-hot-toast"

import { setLoading } from "../../../redux/slices/authSlice"
import { setUser } from "../../../redux/slices/profileSlice"
import { apiConnector } from "../../apiconnector"
import { endpoints } from "../../apis"




const {LOGIN_API} = endpoints



export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log("hi from 1");
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
      console.log("hi from 2");

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setUser({ ...response.data.response}))
      
      localStorage.setItem("user", JSON.stringify(response.data.response))
      navigate("/")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error(error?.response?.data?.message || "Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}