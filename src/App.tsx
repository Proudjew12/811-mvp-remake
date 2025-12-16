import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@pages/Login/Login";

import AdminDashboard from "@pages/Admin/placeHolderAdmin";

import OrganizationDashboard from "@pages/Organization/placeHolderOrginizintion";

import UserDashboard from "@pages/User/Dashboard/UserDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route
        path="/organization"
        element={<Navigate to="/organization/dashboard" replace />}
      />
      <Route
        path="/organization/dashboard"
        element={<OrganizationDashboard />}
      />

      <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
