import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from 'axios';
// import CustomerForm from './components/customerForm/CustomerForm';
// import CustomerTable from './components/customerTable/CustomerTable';
// import SearchBar from './components/searchBar/SearchBar';
import "./App.css";
import Login from "./components/login/LoginScreen";
import RegisterScreen from "./components/registerComponent/RegisterScreen";
import ChangePasswordScreen from "./components/password/ChangePasswordScreen";
import MainLayout from "./components/dashboard/MainLayout";
import { AuthProvider } from "./utils/contexts/AuthContext";
import ProtectedRoute from "./utils/gaurds/ProtectedRoute ";
import Loader from "./globalComponents/globalLoader/Loader";
import { LoaderProvider, useLoader } from "./utils/contexts/LodaerContext";

function App() {
  return (
    <div className="App" id="root">
      <div className="app-background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <BrowserRouter>
          <LoaderProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<RegisterScreen />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/change-password" element={<ChangePasswordScreen />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="main" element={<MainLayout />} />
                </Route>
                {/* <Route path="*" element={<NoPage />} /> */}
              </Routes>
              <GlobalLoader />
            </AuthProvider>
          </LoaderProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}
const GlobalLoader = () => {
  const { isLoading } = useLoader();
  return isLoading ? <Loader /> : null;
};

export default App;
