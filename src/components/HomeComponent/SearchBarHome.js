import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";

const SearchBar = () => {
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const events = useSelector((state) => state.event.event);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fuse = useMemo(() => {
    return new Fuse(events, {
      keys: ["name"],
      threshold: 0.4,
    });
  }, [events]);

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }

    // match kr rhe event ka ki exist krta ya nhi nhi tho toast dikha do wrna dekh lo
    const matchedEvent = events.find(
      (e) => e.name.toLowerCase() === query.toLowerCase()
    );

    if (matchedEvent) {
      navigate(`/event/${matchedEvent._id}`);
    } else {
      toast.error("Event not found.");
    }
  };

  const handleSuggestionClick = (event) => {
    setQuery(event.name);
    setSuggestions([]);
    navigate(`/event/${event._id}`);
  };

  const handleQueryChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() === "") {
      setSuggestions([]);
    } else {
      const results = fuse.search(input).slice(0, 5);
      setSuggestions(results.map((res) => res.item));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-16 left-0 right-0 z-[60] bg-[#04092C] py-3 px-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex flex-col items-center w-full max-w-3xl relative overflow-visible">
        <div className="flex items-center w-full gap-2" ref={filterRef}>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events, artists, venues..."
              value={query}
              onChange={handleQueryChange}
              className="w-full px-4 py-2 text-sm md:text-base rounded-md border border-gray-300 text-black focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-50 bg-white w-full border border-gray-200 rounded-md mt-1 max-h-48 overflow-y-auto shadow-md">
                {suggestions.map((event) => (
                  <li
                    key={event._id}
                    onClick={() => handleSuggestionClick(event)}
                    className="px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer transition"
                  >
                    {event.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-md transition text-sm md:text-base"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
