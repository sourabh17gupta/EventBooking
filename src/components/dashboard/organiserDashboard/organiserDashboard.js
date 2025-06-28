import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../Profile'
import EventList from './EventList'
import CreateEvent from './CreateEvent'
import getOrganiserEventApi from '../../../api/Services/Eventapi/getOrganiserEventApi'

function OrganiserDashboard() {
  const organiserEvents = useSelector(state => state.organiserEvent.events)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!organiserEvents || organiserEvents.length === 0) {
    dispatch(getOrganiserEventApi())
    }
  }, [dispatch])

  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="p-4 sm:p-6 min-h-[80vh]">
      {/* Blocked User Banner */}
      {user?.blocked && (
        <div className="bg-red-600 text-white text-center py-2 mb-4 rounded">
          Your account is currently blocked. Some features may be restricted.
        </div>
      )}

      {/* Tab Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: 'Profile', key: 'profile' },
          { label: 'My Event', key: 'myevent' },
          { label: 'Create Event', key: 'createEvent' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#000000] text-white p-4 sm:p-6 rounded-xl shadow-md">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'myevent' && <EventList />}
        {activeTab === 'createEvent' && <CreateEvent />}
      </div>
    </div>
  )
}

export default OrganiserDashboard
