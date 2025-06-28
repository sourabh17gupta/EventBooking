import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  const handleSearch = () => {
    if(!query && !address && !date){
      toast.error("please enter atleast one of field to search based on filter");
    }
    else{
      navigate(`/searchEvent?query=${query}&location=${address}&date=${date}`);
    }
    
  };

  // Close mobile filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-16 left-0 right-0 z-[60] bg-[#04092C] py-3 px-4 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center w-full max-w-6xl gap-2 relative overflow-visible">
        
        {/* Main Search Input */}
        <input
          type="text"
          placeholder="Search events, artists, venues..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 text-sm md:text-base rounded-md border border-gray-300 text-black focus:outline-none"
        />

        {/* Filters for md+ screens */}
        <div className="hidden md:flex gap-2">
          <input
            type="text"
            placeholder="City or Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-40 px-3 py-2 rounded-md border border-gray-300 text-black focus:outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-36 px-3 py-2 rounded-md border border-gray-300 text-black focus:outline-none cursor-pointer"
          />
        </div>

        {/* Filter Toggle on Mobile */}
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="md:hidden p-2 rounded-md bg-gray-200 hover:bg-gray-300"
        >
          <FiFilter className="text-xl" />
        </button>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-md transition text-sm md:text-base whitespace-nowrap"
        >
          Search
        </button>

        {/* Dropdown for Mobile Filters */}
        {showFilters && (
          <div
            ref={filterRef}
            className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 flex flex-col gap-3 z-50 md:hidden"
          >
            <input
              type="text"
              placeholder="City or Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-black focus:outline-none"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 text-black focus:outline-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
