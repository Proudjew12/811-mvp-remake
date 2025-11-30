import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/Login/Login";

// Admin
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import ControlPanel from "./pages/Admin/ControlPanel/ControlPanel";

// Organization
import OrganizationDashboard from "./pages/Organization/Dashboard/OrganizationDashboard";
import VolunteersPage from "./pages/Organization/VolunteersPage/VolunteersPage";

// User
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import UserRequestPage from "./pages/User/RequestPage/UserRequestPage";
import MyRequestPage from "./pages/User/MyRequest/MyRequest";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/control-panel" element={<ControlPanel />} />
      <Route path="/admin/requests" element={<AdminDashboard />} />

      {/* Organization */}
      <Route
        path="/organization"
        element={<Navigate to="/organization/dashboard" replace />}
      />
      <Route
        path="/organization/dashboard"
        element={<OrganizationDashboard />}
      />
      <Route path="/organization/volunteers" element={<VolunteersPage />} />

      {/* User */}
      <Route path="/user" element={<Navigate to="/user/dashboard" replace />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/request" element={<UserRequestPage />} />
      <Route path="/user/my-request" element={<MyRequestPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
