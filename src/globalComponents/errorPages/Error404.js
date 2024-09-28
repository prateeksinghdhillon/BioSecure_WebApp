import React from "react";

import "./Error404.css";

function NoCustomerFound({handle404}) {
  return (
    <div className="no-customer-container">
      <div className="message-container">
        <h1>404 - No Customers Found</h1>
        <p>Sorry, we couldn't find any customer records in the system.</p>
        <p>
        Kindly return at a later time or add users.
        </p>
        <button
          className="go-back-button"
          onClick={() => {
            handle404("reload");
          }}
        >
          Reload
        </button>
        <button
          className="go-back-button"
          onClick={() => {
            handle404("add");
          }}
        >
          Add User
        </button>
      </div>
    </div>
  );
}

export default NoCustomerFound;
