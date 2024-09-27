import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from 'axios';
// import CustomerForm from './components/customerForm/CustomerForm';
// import CustomerTable from './components/customerTable/CustomerTable';
// import SearchBar from './components/searchBar/SearchBar';
import { setAxiosBaseUrl } from "./utils/http";
import Login from "./components/login/LoginScreen";
import RegisterScreen from "./components/registerComponent/RegisterScreen";
import ChangePasswordScreen from "./components/password/ChangePasswordScreen";
const baseUrl = "http://103.196.1.95:5000"; // Change this as needed
setAxiosBaseUrl(baseUrl);
function App() {
  // const [customers, setCustomers] = useState([]);
  // const [selectedCustomer, setSelectedCustomer] = useState(null);
  // const [searchCriteria, setSearchCriteria] = useState({ filterBy: '', query: '' });

  // Fetch customers from API
  // useEffect(() => {
  //   fetchCustomers();
  // }, []);

  // const fetchCustomers = async (filter = '') => {
  //   try {
  //     const response = await axios.get(`/get${filter}`);
  //     setCustomers(response.data.data || []);
  //   } catch (error) {
  //     console.error('Error fetching customers:', error);
  //   }
  // };

  // const handleSearch = () => {
  //   const filter = `?${searchCriteria.filterBy}=${searchCriteria.query}`;
  //   fetchCustomers(filter);
  // };

  // const handleCreateOrUpdate = (customer) => {
  //   if (customer.id) {
  //     updateCustomer(customer);
  //   } else {
  //     createCustomer(customer);
  //   }
  // };

  // const createCustomer = async (customer) => {
  //   try {
  //     await axios.post('/create', customer);
  //     fetchCustomers();
  //   } catch (error) {
  //     console.error('Error creating customer:', error);
  //   }
  // };

  // const updateCustomer = async (customer) => {
  //   try {
  //     await axios.put(`/update/${customer.id}`, customer);
  //     fetchCustomers();
  //   } catch (error) {
  //     console.error('Error updating customer:', error);
  //   }
  // };

  // const deleteCustomer = async (id) => {
  //   try {
  //     await axios.delete(`/delete/${id}`);
  //     fetchCustomers();
  //   } catch (error) {
  //     console.error('Error deleting customer:', error);
  //   }
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="change" element={<ChangePasswordScreen />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>

      {/* <h1>Customer Management</h1>
      <SearchBar 
      searchCriteria={searchCriteria} 
      setSearchCriteria={setSearchCriteria} 
      handleSearch={handleSearch}
      />
      <CustomerTable 
        customers={customers} 
        setSelectedCustomer={setSelectedCustomer} 
        deleteCustomer={deleteCustomer} 
        />
        <CustomerForm 
        customer={selectedCustomer} 
        handleCreateOrUpdate={handleCreateOrUpdate} 
      /> */}
      {/* <Login></Login> */}
      {/* <RegisterScreen></RegisterScreen> */}
      {/* <ChangePasswordScreen></ChangePasswordScreen> */}
    </>
  );
}

export default App;
