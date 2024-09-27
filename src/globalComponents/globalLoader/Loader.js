// components/Loader.tsx
import React from "react";
import "./Loader.css"; // Create this file for loader styles

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
