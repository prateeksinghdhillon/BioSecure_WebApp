import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <img src={FaFingerprint} className="icon" />
        <h2>BioSecure Customer View Portal</h2>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h3>Register</h3>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
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
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
        <p onClick={()=>{navigate('/login')}} className="signup-link">Login</p>
      </form>
    </div>
  );
};

export default RegisterScreen;
