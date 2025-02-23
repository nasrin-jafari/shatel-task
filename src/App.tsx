import React from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import Posts from "./Pages/Posts/Posts";
import Header from "./components/Molecules/Header/Header";
const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route index path="/" element={<Posts />} />
        </Route>
        <Route path="*" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
