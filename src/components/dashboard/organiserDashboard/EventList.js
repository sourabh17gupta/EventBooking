import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Star } from 'lucide-react'
import Tab from '../../common/Tab2'

const EventList = () => {
  const organiserEvents = useSelector(state => state.organiserEvent.events)
  const [filter, setFilter] = useState('upcoming')

  const tabData = [
    { id: 1, tabName: 'Upcoming', type: 'upcoming' },
    { id: 2, tabName: 'Past', type: 'past' },
  ]

  const now = new Date()
  const filteredEvents = organiserEvents
    ?.filter(event => {
      const eventDate = new Date(event.date)
      return filter === 'upcoming' ? eventDate >= now : eventDate < now
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date)) || []

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto min-h-[20vh]">
      {/* Toggle Tabs */}
      <Tab tabData={tabData} field={filter} setField={setFilter} />

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <p className="text-white text-center">No events found.</p>
      ) : (
        filteredEvents.map((event, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row bg-black text-white rounded-2xl overflow-hidden shadow-md transition hover:shadow-xl"
          >
            {/* Image */}
            <img
              src={event.image}
              alt="Event"
              className="w-full sm:w-[250px] h-[200px] object-cover"
            />

            {/* Center Info */}
            <div className="flex-1 p-4 space-y-1">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-sm text-gray-300">
                {moment(event.date).format('MMMM Do, YYYY')}
              </p>
              <p className="text-sm text-gray-400">{event.category}</p>
            </div>

            {/* Right Stats */}
            <div className="p-4 flex flex-col justify-center text-right min-w-[140px] space-y-1">
              <div className="flex items-center justify-end text-yellow-400 space-x-1">
                <Star className="w-4 h-4" />
                <span>{event.avgRated?.toFixed(1) || '0.0'}</span>
              </div>
              <p className="text-sm text-gray-300">{event.totalRatings} Ratings</p>
              <p className="text-sm text-gray-300">{event.attendessCount} Attendees</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default EventList
