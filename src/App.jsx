import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/LoginScreen";
import RegisterScreen from "./components/registerComponent/RegisterScreen";
import ChangePasswordScreen from "./components/password/ChangePasswordScreen";
import MainLayout from "./components/dashboard/MainLayout";
import { AuthProvider } from "./utils/contexts/AuthContext";
import ProtectedRoute from "./utils/gaurds/ProtectedRoute ";
import Loader from "./globalComponents/globalLoader/Loader";
import { LoaderProvider, useLoader } from "./utils/contexts/LodaerContext";
import Error503 from "./globalComponents/errorPages/Error503";
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
        <Router>
          <LoaderProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<RegisterScreen />} />
                <Route element={<ProtectedRoute />}>
                  <Route
                    path="change-password"
                    element={<ChangePasswordScreen />}
                  />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="main" element={<MainLayout />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                  <Route path="error503" element={<Error503 />} />
                </Route>
                {/* <Route path="*" element={<NoPage />} /> */}
              </Routes>
              <GlobalLoader />
            </AuthProvider>
          </LoaderProvider>
        </Router>
      </div>
    </div>
  );
}

const GlobalLoader = () => {
  const { isLoading } = useLoader();
  return isLoading ? <Loader /> : null;
};

export default App;
