import React, { useState } from 'react'
import toast from 'react-hot-toast'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Handle form submission (email, API, etc.)
    toast.success('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-300 mb-12 text-center">
          Have a question, suggestion, or just want to say hello? We're happy to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-blue-400">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block mb-1 text-blue-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block mb-1 text-blue-400">Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-2 bg-gray-900 border border-blue-500 rounded focus:ring-2 focus:ring-blue-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-full font-semibold"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-gray-300 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-400">📍 Our Office</h2>
              <p>
                EventSphere HQ<br />
                H.No-139, Sector-31<br />
                Collierborough, ND 37365
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400">📧 Email</h2>
              <p>support@eventsphere.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-blue-400">📞 Phone</h2>
              <p>+1 (234) 567-8910</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
