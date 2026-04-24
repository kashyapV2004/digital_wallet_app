import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Footer from "./components/Footer.jsx";
import Transactions from "./components/Transaction.jsx";
import React from "react";
import Register from "./pages/Register.jsx";
import Transfer from "./components/Transfer.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="flex h-screen">
      <ToastContainer />
      <div className="fixed top-0 left-0 w-64 h-screen bg-gray-500 text-white">
        <Sidebar />
      </div>
      <div className="fixed top-0 left-0 right-0 bottom-0 h-screen flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/balance" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/transfer" element={<Transfer />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/add" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
