import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import Posts from "./Pages/Posts/Posts";
const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Posts />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
