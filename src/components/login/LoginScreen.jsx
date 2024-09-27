import React, { useState } from "react";
import "./Login.css";
import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/contexts/AuthContext";
import { postToAuth } from "../../utils/AuthCilent";
import { useLoader } from "../../utils/contexts/LodaerContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const { setLoading } = useLoader();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await postToAuth("/login", formData);
      setMessage(res.message);
      localStorage.setItem("token", res.token);
      localStorage.setItem("localIp", res.localIp);
      login({
        token: res.token,
        localIp: res.localIp,
        username: formData.username,
        fullname: res.fullname,
        ssid: res.ssid,
      });
      setLoading(false);
      navigate("/main");
    } catch (err) {
      setLoading(false);
      setMessage(err.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <img src={FaFingerprint} alt="" className="icon" />
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
