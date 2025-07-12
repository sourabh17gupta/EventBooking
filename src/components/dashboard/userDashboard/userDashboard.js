import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../Profile'
import MyEvent from './MyEvent'
import GetAttendeeEventApi from '../../../api/Services/Eventapi/GetAttendeeEvent'

function UserDashboard() {
  const dispatch = useDispatch()
  const { events: attendeeEvent } = useSelector(state => state.attendeeEvent)
  const { user } = useSelector(state => state.profile)

  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (!attendeeEvent || attendeeEvent.length === 0) {
      dispatch(GetAttendeeEventApi())
    }
  }, [attendeeEvent, dispatch])

  return (
    <div className="p-6">
      {user?.blocked && (
        <div className="bg-red-600 text-white text-center py-2 mb-4 rounded">
          Your account is currently blocked. Some features may be restricted.
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-white border border-white'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('myevent')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'myevent' ? 'bg-blue-600 text-white' : 'text-white border border-white'
          }`}
        >
          My Event
        </button>
      </div>

      <div className="bg-[#000000] text-white p-6 rounded shadow min-h-[300px]">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'myevent' && <MyEvent />}
      </div>
    </div>
  )
}

export default UserDashboard
