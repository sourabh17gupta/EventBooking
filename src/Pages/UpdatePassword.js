import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { resetPassword } from "../api/Services/Authapi/ResetPassword"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const { token } = useParams() 

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-black px-4 py-6">
      {loading ? (
        <div className="spinner">Passeord is updating in process</div>
      ) : (
        <div className="w-full max-w-[600px] p-8 shadow-2xl bg-richblack-800 rounded-xl">
          <h1 className="text-4xl font-bold text-blue-500 mb-4">
            Choose New Password
          </h1>
          <p className="mb-8 text-base text-richblack-200 leading-6">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            {/* Password */}
            <div className="relative">
              <label className="text-sm mb-2 block text-white">
                New Password <sup className="text-pink-200">*</sup>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter New Password"
                className="w-full rounded-xl bg-richblack-700 px-4 py-3 text-lg text-white placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-sm mb-2 block text-white">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-xl bg-richblack-700 px-4 py-3 text-lg text-white placeholder:text-richblack-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-[50%] translate-y-[-50%] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-all duration-200"
            >
              Reset Password
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <Link to="/login">
              <p className="flex items-center justify-center gap-x-2 text-richblack-200 hover:underline">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
