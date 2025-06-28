import { toast } from "react-hot-toast";

import { setLoading } from "../../../redux/slices/authSlice";
import { apiConnector } from "../../apiconnector";
import { endpoints } from "../../apis";
import { setUser } from "../../../redux/slices/profileSlice";

const { SIGNUP_API } = endpoints;

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  role,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const data = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        role,
      });

      console.log("SIGNUP API RESPONSE............", data);

      if (!data.data.success) {
        throw new Error(data.data.message);
      }

      const { response } = data.data;

      toast.success("Signup Successful");

      dispatch(setUser({ ...response }));
      localStorage.setItem("user", JSON.stringify(response));
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error.response?.data || error);
      toast.error(error?.response?.data?.message || "Signup Failed");
      // navigate("/signup")
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
