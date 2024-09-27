import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);
      setMessage(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("localIp", res.data.localIp);
    } catch (err) {
      setMessage(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={FaFingerprint} className="icon" />
        <h2>BioSecure Customer View Portal</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p
          onClick={() => {
            navigate("/register");
          }}
          className="signup-link"
        >
          Sign Up
        </p>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
