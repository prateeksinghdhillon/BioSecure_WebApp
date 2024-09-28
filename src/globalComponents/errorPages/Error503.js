import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error503.css"; // Create a separate CSS file for styling
import { useAuth } from "../../utils/contexts/AuthContext";

const Error503 = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/main"); // Redirect to main route if connected to correct Wi-Fi
  };
  const { user } = useAuth();
  return (
    <div className="error-page">
      <div className="error-container">
        <h1 className="error-title">Error 503: Service Unavailable</h1>
        <p className="error-message">
          The service is currently unavailable. Please check your connection or
          check if your Fingerprint device is ON.
        </p>
        <p className="error-instructions">
          Ensure you're connected to the <strong>"{user?.ssid}"</strong> Wi-Fi
          network.
        </p>
        <button className="retry-button" onClick={handleRetry}>
          Connected! Retry
        </button>
      </div>
    </div>
  );
};

export default Error503;
