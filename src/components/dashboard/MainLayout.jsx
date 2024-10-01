import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MainLayout.css";
import CustomerTable from "../customerTable/CustomerTable";
import SearchBar from "../searchBar/SearchBar";
import {
  deleteFromPiAPi,
  getFromPiAPi,
  postToPiAPi,
  putToPiAPi,
} from "../../utils/PiCilent";
import { useAuth } from "../../utils/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import FaFingerprint from "../../assets/fingerprint.png"; // Importing fingerprint icon
import { useLoader } from "../../utils/contexts/LodaerContext";
import CustomerForm from "../customerForm/CustomerForm";
import ScrollToTop from "../../globalComponents/ScrollToTop/ScrollToTop";

import GearIcon from "../../assets/settings.png";
import NoCustomerFound from "../../globalComponents/errorPages/Error404";

function MainLayout() {
  const mainLayoutRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    filterBy: "",
    query: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [show404, setShow404] = useState(false);

  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const fetchCustomers = useCallback(
    async (filter = "") => {
      try {
        setLoading(true);
        const response = await getFromPiAPi(user.username, `/get${filter}`);

        setCustomers(response.data || []);
        setShow404(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.code === 503) {
          console.log("network error");
          navigate("/error503");
        } else if (error.message === "No customers found") {
          setShow404(true);
        } else {
          setShow404(false);
          console.error("Error fetching customers:", error);
        }
      }
    },
    [setLoading, user, navigate]
  );
  // 404 Button handler
  const handle404 = (btn) => {
    if (btn === "reload") {
      fetchCustomers();
    } else {
      setShowForm(true);
    }
  };

  // Fetch customers from API
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]); //

  const handleSearch = () => {
    const filter = `?${searchCriteria.filterBy}=${searchCriteria.query}`;
    fetchCustomers(filter);
  };
  const handleAddUser = (btn, customer) => {
    if (btn === "add") {
      setSelectedCustomer(undefined);
      setShowForm(!showForm);
    } else if (btn === "edit") {
      setSelectedCustomer(customer);
      setShowForm(!showForm);
    } else {
      setShowForm(!showForm);
    }
  };
  const handleCreateOrUpdate = (customer) => {
    if (customer.id) {
      updateCustomer(customer);
    } else {
      createCustomer(customer);
    }
  };

  const createCustomer = async (customer) => {
    try {
      setLoading(true);
      await postToPiAPi(user.username, "/create", customer);
      setLoading(false);
      setShowForm(!showForm);
      fetchCustomers();
    } catch (error) {
      setLoading(false);
      console.error("Error creating customer:", error);
    }
  };

  const updateCustomer = async (customer) => {
    try {
      setLoading(true);
      await putToPiAPi(user.username, `/update/${customer.id}`, customer);
      setLoading(false);
      setShowForm(!showForm);
      fetchCustomers();
    } catch (error) {
      setLoading(false);
      console.error("Error updating customer:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      await deleteFromPiAPi(user.username, `/delete/${id}`);
      setLoading(false);
      fetchCustomers();
    } catch (error) {
      setLoading(false);
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="main-layout background" ref={mainLayoutRef}>
      {/* Navigation Header */}
      <header className="main-header">
        <div className="nav-left">
          <div className="main-header">
            <img src={FaFingerprint} alt="" className="main-icon" />
            <h2>BioSecure Customer View Portal</h2>
          </div>
        </div>
        <div className="nav-right">
          <span className="username">
            Hi! {user.fullname} you are connected to{" "}
            <span className="wifi"> "{user.ssid}"</span>
          </span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="logout-button"
          >
            Logout
          </button>
          <img
            style={{ marginLeft: 20, height: 30, cursor: "pointer" }}
            src={GearIcon}
            alt="Settings"
            onClick={() => {
              navigate("/change-password");
            }}
          />
        </div>
      </header>
      {showForm ? (
        <CustomerForm
          customer={selectedCustomer}
          handleCreateOrUpdate={handleCreateOrUpdate}
          handleAddUser={handleAddUser}
        />
      ) : (
        <>
          <div className="search-section">
            <SearchBar
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
              handleSearch={handleSearch}
              handleAddUser={handleAddUser}
            />
          </div>

          {show404 ? (
            <NoCustomerFound handle404={handle404} />
          ) : (
            <div className="table-section">
              <CustomerTable
                customers={customers}
                handleAddUser={handleAddUser}
                deleteCustomer={deleteCustomer}
              />
            </div>
          )}
        </>
      )}
      <ScrollToTop containerRef={mainLayoutRef} />
    </div>
  );
}

export default MainLayout;
