
import { toast } from "react-hot-toast"
import { setLoading } from "../../../redux/slices/authSlice"
import { apiConnector } from "../../apiconnector"
import { endpoints } from "../../apis"

const { RESETPASSWORD_API } = endpoints

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "POST",
        `${RESETPASSWORD_API}/${token}`, 
        {
          newPassword: password,      
          confirmPassword,
        }
      )

      console.log("RESET PASSWORD RESPONSE", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Password has been reset successfully")
    } catch (error) {
      console.log("RESET PASSWORD ERROR", error)
      toast.error(error?.response?.data?.message || "Unable to reset password")
    } finally {
      dispatch(setLoading(false))
    }
  }
}
