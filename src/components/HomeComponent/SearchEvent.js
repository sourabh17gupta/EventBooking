import { useSearchParams } from "react-router-dom";
import React from "react";

const SearchEvent = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  const location = searchParams.get("location");
  const date = searchParams.get("date");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p>Search: <strong>{query}</strong></p>
      <p>Location: <strong>{location}</strong></p>
      <p>Date: <strong>{date}</strong></p>

      {/* You can now use this data to filter events */}
    </div>
  );
};

export default SearchEvent;
