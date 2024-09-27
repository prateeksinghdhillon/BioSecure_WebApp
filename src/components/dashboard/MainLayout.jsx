import React, { useEffect, useRef, useState } from "react";
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

function MainLayout() {
  const mainLayoutRef = useRef(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    filterBy: "",
    query: "",
  });
  const [showForm, setShowForm] = useState(false);

  const { setLoading } = useLoader();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  console.log(selectedCustomer);
  // Fetch customers from API
  useEffect(() => {
    console.log(".......use effect");
    fetchCustomers();
  }, []);

  const fetchCustomers = async (filter = "") => {
    try {
      setLoading(true);
      const response = await getFromPiAPi(user.localIp, `/get${filter}`);
      console.log(response);
      setCustomers(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = () => {
    const filter = `?${searchCriteria.filterBy}=${searchCriteria.query}`;
    fetchCustomers(filter);
  };
  const handleAddUser = (btn, customer) => {
    console.log(btn);
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
      await postToPiAPi(user.localIp, "/create", customer);
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
      await putToPiAPi(user.localIp, `/update/${customer.id}`, customer);
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
      await deleteFromPiAPi(user.localIp, `/delete/${id}`);
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
            style={{ marginLeft: 20, height: 30,cursor:"pointer" }}
            src={GearIcon}
            alt="Settings"
            onClick={()=>{navigate("/change-password")}}
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

          <div className="table-section">
            <CustomerTable
              customers={customers}
              handleAddUser={handleAddUser}
              deleteCustomer={deleteCustomer}
            />
          </div>
        </>
      )}
      <ScrollToTop containerRef={mainLayoutRef} />
    </div>
  );
}

export default MainLayout;
