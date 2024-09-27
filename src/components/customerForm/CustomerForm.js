import React, { useState, useEffect } from "react";
import "./CustomerForm.css"; // Import the CSS file

function CustomerForm({ customer, handleCreateOrUpdate, handleAddUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phnumber: "",
    subenddate: "",
    role: "",
    isFingerEnroled: false,
  });

  useEffect(() => {
    if (customer) {
      setFormData({ ...customer });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateOrUpdate(formData);
    setFormData({
      name: "",
      email: "",
      phnumber: "",
      subenddate: "",
      role: "",
      isFingerEnroled: false,
    });
  };

  return (
    <div className="customer-form-area">
      <div className="customer-form-container">
        <div className="form-header">
          <div onClick={handleAddUser} className="arrow"></div>
          <h2 className="form-title">Customer Information</h2>{" "}
          {/* Add a title */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phnumber">Phone Number:</label>
            <input
              type="number"
              id="phnumber"
              name="phnumber"
              placeholder="Enter Phone Number"
              value={formData.phnumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subenddate">Subscription End Date:</label>
            <input
              type="date"
              id="subenddate"
              name="subenddate"
              placeholder="Select Subscription End Date"
              value={formData.subenddate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              {/* Add more role options as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="isFingerEnroled">Finger Enrolled:</label>
            <input
              type="checkbox"
              id="isFingerEnroled"
              name="isFingerEnroled"
              checked={formData.isFingerEnroled}
              onChange={handleChange}
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <p onClick={handleAddUser} className="cancel-button">
              Cancel
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomerForm;
