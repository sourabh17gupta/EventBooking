import { toast } from "react-hot-toast"
import { setLoading } from "../../../redux/slices/authSlice"
import { apiConnector } from "../../apiconnector"
import { endpoints } from "../../apis"

const { RESETPASSTOKEN_API } = endpoints

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true))

    try {
      if (!email || !email.trim()) {
        toast.error("Please enter your email")
        dispatch(setLoading(false))
        return
      }

      console.log("Sending reset request for email:", email)

      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })

      console.log("RESET PASSWORD TOKEN RESPONSE:", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Reset email sent")
      setEmailSent(true)
    } catch (error) {
      console.error("RESET PASSWORD TOKEN ERROR:", error)
      toast.error(
        error?.response?.data?.message || "Failed to send reset email"
      )
    } finally {
      dispatch(setLoading(false))
    }
  }
}

