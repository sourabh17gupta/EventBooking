// Loader.jsx
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-400 border-t-transparent"></div>
    </div>
  );
};

export default Spinner;
