import React from 'react';
import { useEventsByCategory } from '../api/Services/catalogApi/FetchEvent';
import { useSearchParams, useNavigate } from 'react-router-dom';

const EventsByCategory = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const category = searchParams.get('category');



  const { data, isLoading, error } = useEventsByCategory(category);

  if (!category) return <p className="text-white text-center mt-10">No category selected.</p>;
  if (isLoading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-400 text-center mt-10">Error: {error.message}</p>;

  const events = Array.isArray(data) ? data : [];//if data assignr

  return (
    <div className="px-4 py-8 text-white bg-[#000000]">
      <h2 className="text-2xl font-bold mt-10 mb-6 text-center">Events in {category}</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold mb-1">{event.name}</h3>
                <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                <p className="text-sm text-gray-300">{event.venue}</p>
                <p className="text-sm text-gray-300">{event.date}</p>
                <p className="text-sm text-green-400 font-semibold mt-2">${event.price}</p>
              </div>
              <button
                onClick={() => navigate(`/event/${event._id}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsByCategory;
