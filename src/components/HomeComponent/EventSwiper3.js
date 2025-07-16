import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserLocation from "../../Hooks/UserLocation";
import { useNearbyEvents } from "../../api/Services/HomePageapi/nearbyEventApi";
import { motion } from "framer-motion";

export const EventSwiper3 = () => {
  const { location, error: locationError } = useUserLocation();
  const {
    data: events,
    isLoading,
    error: fetchError,
  } = useNearbyEvents(location);

  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  if (locationError) return <p className="text-red-500">{locationError}</p>;
  if (fetchError) return <p className="text-red-500">Error fetching events.</p>;
  if (isLoading) return <p className="text-white">Loading nearby events...</p>;
  if (!events || events.length === 0)
    return <p className="text-white">No events found.</p>;

  const visibleEvents = events.slice(0, visibleCount);

  const handleViewDetail = (id) => navigate(`/event/${id}`);

  const handleToggleVisibility = () => {
    setVisibleCount((prev) =>
      prev >= events.length ? 4 : prev + 4
    );
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-6 px-4">


      <div className="h-px bg-white/20 mb-4" />

      {/* Event Cards */}
      <div className="flex flex-col gap-4">
        {visibleEvents.map((e, idx) => (
          <motion.div
            key={e._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-xl overflow-hidden transition-shadow hover:shadow-xl px-2 py-2 md:px-4 md:py-3"
          >
            {/* Image */}
            <div className="w-20 h-20 md:w-28 md:h-24 flex-shrink-0">
              <img
                src={e.image}
                alt={e.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="flex-1 px-2 md:px-4 text-white text-xs md:text-sm">
              <h3 className="font-semibold truncate">{e.name}</h3>
              <p className="text-[10px] md:text-xs text-gray-300">
                {e.date || "TBA"}
              </p>
              <p className="text-[10px] md:text-xs text-gray-400">
                {e.category?.category || "Uncategorized"}
              </p>
            </div>

            {/* View Details */}
            <div className="pr-2 md:pr-4">
              <button
                onClick={() => handleViewDetail(e._id)}
                className="text-white text-[10px] md:text-xs border border-white/50 px-3 md:px-4 py-1 rounded-full hover:bg-white hover:text-black transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* See More / Show Less */}
      {events.length > 4 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleToggleVisibility}
            className="text-white border border-white/50 px-6 py-1.5 rounded-full hover:bg-white hover:text-black text-sm transition"
          >
            {visibleCount >= events.length ? "Show Less" : "See More"}
          </button>
        </div>
      )}
    </div>
  );
};
