import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="relative max-w-md mx-auto bg-[#000000] text-white shadow-lg rounded-xl p-6 mt-8 min-h-[250px]">

      {/* User Info */}
      <div className="absolute space-y-6 pl-4 mt-2 left-[-20%]">
        <div className="flex gap-2">
          <p className="text-sm text-blue-500 font-medium">Firstname:</p>
          <p className="text-lg ml-[10%]">{user?.firstName || 'N/A'}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-sm text-blue-500 font-medium">Lastname:</p>
          <p className="text-lg ml-[10%]">{user?.lastName || 'N/A'}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-sm text-blue-500 font-medium">Email:</p>
          <p className="text-lg ml-[10%]">{user?.email || 'N/A'}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-sm text-blue-500 font-medium">Role:</p>
          <p className="text-lg ml-[10%]">{user?.role || 'N/A'}</p>
        </div>
      </div>

      {/* Edit button in bottom-right */}
      <button
        onClick={() => navigate('/dashboard/edit-profile')}
        className="absolute bottom-[-15%] right-[4%] bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Edit Profile
      </button>
    </div>
  )
}

export default Profile
