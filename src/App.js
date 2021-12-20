import "./App.css";
import React from "react";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import { cleanSessionStorage } from "./services/dataService";

const App = () => {
  cleanSessionStorage();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
