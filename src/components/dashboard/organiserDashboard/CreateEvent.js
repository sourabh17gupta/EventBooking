import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import CreateEventApi from '../../../api/Services/Eventapi/CreateEventApi'
import toast from 'react-hot-toast'

const CreateEvent = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    price: '',
    description: '',
    categoryName: '',
    image: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Optional: Add frontend validation if needed
    if (!formData.categoryName) {
      toast.error("Please select a category")
      return
    }

    await dispatch(CreateEventApi(formData))
    setFormData({
      name: '',
      date: '',
      venue: '',
      price: '',
      description: '',
      categoryName: '',
      image: null,
    })
  }

  return (
    <div className="max-w-3xl mx-auto bg-black text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-500 mb-6">Create New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-blue-400 mb-1">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-blue-400 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-blue-400 mb-1">Venue</label>
          <input
            type="text"
            name="venue"
            placeholder="e.g. H.No-139, Sector-31, North Dakota 37365"
            value={formData.venue}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-blue-400 mb-1">Price (in ₹)</label>
          <input
            type="number"
            name="price"
            min="1"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-blue-400 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
      <div>
       <label className="block text-blue-400 mb-1">Category</label>
       <input
        type="text"
        name="categoryName"
        value={formData.categoryName}
        onChange={handleChange}
        placeholder="Enter category name (e.g. Music, Tech)"
        className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
        required
       />
     </div>


        {/* Image Upload */}
        <div>
          <label className="block text-blue-400 mb-1">Event Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-2 rounded border border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-semibold"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}

export default CreateEvent
