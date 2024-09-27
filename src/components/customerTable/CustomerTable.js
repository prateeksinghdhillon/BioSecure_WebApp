import React from 'react';
import './CustomerTable.css'; // Import the CSS file

function CustomerTable({ customers, setSelectedCustomer, deleteCustomer }) {
  return (
    <table className="customer-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Enroll Date</th>
          <th>Sub End Date</th>
          <th>Role</th>
          <th>Is Finger Enrolled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}> {/* Use unique identifier (id) for key */}
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>{customer.email}</td>
            <td>{customer.phnumber}</td>
            <td>{customer.enrolldate}</td>
            <td>{customer.subenddate}</td>
            <td>{customer.role}</td>
            <td>{customer.isFingerEnroled === 1 ? 'Yes' : 'No'}</td>
            <td>
              <div className="actions"> {/* Wrap buttons in a container */}
                <button
                  className="edit-button"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteCustomer(customer.id)} // Use id for deletion
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerTable;