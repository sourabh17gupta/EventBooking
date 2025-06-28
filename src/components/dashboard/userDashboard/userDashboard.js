import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Profile from '../Profile'
import MyEvent from './MyEvent'

function UserDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="p-6">

      {/* Blocked User Banner */}
      {user?.blocked && (
        <div className="bg-red-600 text-white text-center py-2 mb-4 rounded">
           Your account is currently blocked. Some features may be restricted.
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-full 
            ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-white border border-white'}`}
        >
          Profile
        </button>

        <button
          onClick={() => setActiveTab('myevent')}
          className={`px-4 py-2 rounded-full 
            ${activeTab === 'myevent' ? 'bg-blue-600 text-white' : 'text-white border border-white'}`}
        >
          My Event
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#000000] text-white p-6 rounded shadow relative min-h-[300px]">
        <div className="absolute top-4 left-4 right-4">
          {activeTab === 'profile' && <Profile />}
          {activeTab === 'myevent' && <MyEvent />}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
