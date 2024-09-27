import React, { useState } from "react";
import "./ChangePassword.css";

import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";
import { postToAuth } from "../../utils/AuthCilent";
import { useLoader } from "../../utils/contexts/LodaerContext";
import { useAuth } from "../../utils/contexts/AuthContext";

const ChangePasswordScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const { setLoading } = useLoader();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postToAuth("/change-password", formData);
      console.log(res);
      setLoading(false);
      setMessage(res.data.message);
    } catch (err) {
      setLoading(false);
      setMessage(err.response.data.message || "Password update failed");
    }
  };

  return (
    <div className="change-password-container">
      <div className="header">
        <img src={FaFingerprint} alt="" className="icon" />
        <h2>BioSecure Customer View Portal</h2>
      </div>
      <form className="change-password-form" onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
          required
          disabled
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
        <p
          onClick={() => {
            navigate("/main");
          }}
          className="signup-link"
        >
          Cancel
        </p>
      </form>
    </div>
  );
};

export default ChangePasswordScreen;
