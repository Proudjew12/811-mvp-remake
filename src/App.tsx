import { Navigate, Route, Routes } from "react-router-dom";

import Login from "@pages/Login/Login";

import AdminDashboard from "@pages/Admin/Dashboard/AdminDashboard";
import ControlPanel from "@pages/Admin/ControlPanel/ControlPanel";

import OrganizationDashboard from "@pages/Organization/Dashboard/OrganizationDashboard";
import VolunteersPage from "@pages/Organization/VolunteersPage/VolunteersPage";

import UserDashboard from "@pages/User/Dashboard/UserDashboard";
import UserRequestPage from "@pages/User/RequestPage/UserRequestPage";
import MyRequestPage from "@pages/User/MyRequest/MyRequest";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/control-panel" element={<ControlPanel />} />
      <Route path="/admin/requests" element={<AdminDashboard />} />

      <Route
        path="/organization"
        element={<Navigate to="/organization/dashboard" replace />}
      />
      <Route
        path="/organization/dashboard"
        element={<OrganizationDashboard />}
      />
      <Route path="/organization/volunteers" element={<VolunteersPage />} />

      <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/request" element={<UserRequestPage />} />
      <Route path="/user/my-request" element={<MyRequestPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
