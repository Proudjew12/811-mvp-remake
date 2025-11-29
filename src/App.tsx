import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import ControlPanel from "./pages/Admin/ControlPanel/ControlPanel";
import RequestPage from "./pages/User/RequestPage/RequestPage";
import OrganizationDashboard from "./pages/Organization/Dashboard/OrganizationDashboard";
import VolunteersPage from "./pages/Organization/VolunteersPage/VolunteersPage";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import UserRequestPage from "./pages/User/RequestPage/RequestPage";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/control-panel" element={<ControlPanel />} />
      <Route path="/admin/user" element={<RequestPage />} />

      {/* Organization */}
      <Route
        path="/organization/dashboard"
        element={<OrganizationDashboard />}
      />
      <Route path="/organization/volunteers" element={<VolunteersPage />} />

      {/* User */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/request" element={<UserRequestPage />} />
    </Routes>
  );
}
