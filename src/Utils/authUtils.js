// utils/authUtils.js
import { setUser, setLoading } from "../redux/slices/profileSlice"
import { toast } from "react-hot-toast"
import { apiConnector } from "../api/apiconnector" 
import {userendpoints} from "../api/apis"


const {USER_INFO_API} = userendpoints

export function checkAuthStatus() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", USER_INFO_API);

      if (response?.data?.success) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(setUser(null));
      }
    } catch (error) {
      console.log("Error checking auth status:", error);
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
