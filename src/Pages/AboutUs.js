import React from 'react'

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">About Us</h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Welcome to <span className="text-white font-semibold">EventSphere</span> — your one-stop destination for discovering, organizing, and attending amazing events. Whether you're a creator, organizer, or passionate attendee, we're here to empower experiences and foster community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mt-10">
          <div>
            <h2 className="text-2xl text-blue-400 font-semibold mb-2">🎯 Our Mission</h2>
            <p className="text-gray-400">
              To connect people through unforgettable experiences. We believe events are more than gatherings — they’re opportunities to inspire, educate, and bring joy.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-blue-400 font-semibold mb-2">🚀 What We Offer</h2>
            <ul className="list-disc list-inside text-gray-400">
              <li>Discover local and trending events</li>
              <li>Easy event creation and management for organizers</li>
              <li>Secure registration and ticketing system</li>
              <li>Smart recommendations based on your interests</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-blue-400 font-semibold mb-2">👨‍💻 Our Team</h2>
            <p className="text-gray-400">
              We are a passionate group of developers, designers, and community builders driven to make events accessible, smooth, and memorable for everyone.
            </p>
          </div>

          <div>
            <h2 className="text-2xl text-blue-400 font-semibold mb-2">📍 Location</h2>
            <p className="text-gray-400">
              Based in India, but serving users globally. Whether it's a tech meetup in Bengaluru or a concert in New York — we’ve got you covered.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
