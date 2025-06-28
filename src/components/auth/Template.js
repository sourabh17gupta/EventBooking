import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-y-10 py-12 md:flex-row md:gap-x-12">
          
          {/* Left Content: Text + Form */}
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-blue-700">{title}</h1>
            <p className="mt-4 text-lg text-gray-300">
              {description1}{" "}
              <span className="italic font-semibold text-blue-400">
                {description2}
              </span>
            </p>

            <div className="mt-8">
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          {/* Right Content: Image (hidden on mobile) */}
          <div className="relative w-full max-w-md hidden md:block">
            <img
              src={image}
              alt="Students"
              className="w-full h-auto rounded-lg border border-gray-700 shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
