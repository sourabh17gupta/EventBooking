import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../../../api/apiconnector'
import { ticketendpoint } from '../../../api/apis'
import { useSelector } from 'react-redux'

const { ticket_api } = ticketendpoint

function UserEventList() {
  const attendeeEvents = useSelector((state) => state.attendeeEvent.events)
  const [ticket, setTicket] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleViewTicket = async (eventId) => {
    if (!eventId) return toast.error('Invalid Event ID')

    try {
      const response = await apiConnector(
        'POST',
        ticket_api,
        { eventid: eventId },
        {
          withCredentials: true,
        }
      )

      const fetchedTicket = response?.data?.ticket
      if (!fetchedTicket) return toast.error('Ticket not found.')

      setTicket(fetchedTicket)
      setShowModal(true)
    } catch (error) {
      console.error('View Ticket Error:', error)
      toast.error(error?.response?.data?.message || 'Failed to load ticket')
    }
  }

  if (!attendeeEvents || attendeeEvents.length === 0) {
    return <p className="text-center text-white mt-10">No Events Found</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4 px-4">
      {attendeeEvents.map((event) => (
        <div
          key={event._id}
          className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 text-white rounded-xl p-4 shadow-md"
        >
          <div className="text-left w-full sm:w-1/2 mb-2 sm:mb-0">
            <p className="text-sm text-gray-400">Event Name</p>
            <p className="text-xl font-bold">{event.name}</p>
          </div>

          <div className="flex flex-col sm:items-end w-full sm:w-1/2 text-right">
            <button
              onClick={() => handleViewTicket(event._id)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-sm px-4 py-1 rounded-md text-white"
            >
              View Ticket
            </button>
          </div>
        </div>
      ))}

      {showModal && ticket && (
        <TicketModal ticket={ticket} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

function TicketModal({ ticket, onClose }) {
  if (!ticket) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl text-gray-600 hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Your Ticket</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Event:</span> {ticket.event?.name}</p>
          <p><span className="font-semibold">Seat No:</span> {ticket.seatNo}</p>
          <p><span className="font-semibold">Price:</span> ₹{ticket.price}</p>
          <p><span className="font-semibold">Issued On:</span> {new Date(ticket.createdAt).toLocaleString()}</p>
          <div className="mt-4 flex justify-center">
            <img src={ticket.QR} alt="QR Code" className="w-40 h-40 object-contain" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserEventList
