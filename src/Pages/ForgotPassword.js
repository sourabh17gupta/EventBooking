import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../api/Services/Authapi/PasswordResettoken"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="min-h-screen bg-[#000000] grid place-items-center px-4">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-[500px] rounded-lg  p-6 lg:p-8 shadow-md">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-blue-700">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-md bg-richblack-700 text-white p-3 border border-richblack-600 placeholder:text-richblack-300 focus:outline-none"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-500 py-3 text-richblack-900 font-semibold hover:bg-yellow-100 transition"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-sm">
            <Link to="/login" className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
