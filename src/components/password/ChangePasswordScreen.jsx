import React, { useState } from "react";
import "./ChangePassword.css";
import axios from "axios";
import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";

const ChangePasswordScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/change-password",
        formData
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Password update failed");
    }
  };

  return (
    <div className="change-password-container">
      <div className="header">
        <img src={FaFingerprint} className="icon" />
        <h2>BioSecure Customer View Portal</h2>
      </div>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
        {message && <p className="message">{message}</p>}
        <p onClick={()=>{navigate('/login')}} className="signup-link">Login</p>
      </form>
    </div>
  );
};

export default ChangePasswordScreen;
