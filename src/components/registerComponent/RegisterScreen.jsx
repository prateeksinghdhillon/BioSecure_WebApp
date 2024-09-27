import React, { useState } from "react";
import "./Register.css";

import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";
import { postToAuth } from "../../utils/AuthCilent";
import { useLoader } from "../../utils/contexts/LodaerContext";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const { setLoading } = useLoader();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postToAuth("/register", formData);
      console.log(res);
      setLoading(false);
      setMessage(res.message);
    } catch (err) {
      setLoading(false);
      console.log();
      console.log(err);
      setMessage(err.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <img src={FaFingerprint} alt="" className="icon" />
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
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="signup-link"
        >
          Login
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
