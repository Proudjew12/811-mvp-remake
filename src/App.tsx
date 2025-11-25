import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import OrganizationPage from "./pages/Organization/OrganizationPage";
import AdminPage from "./pages/Admin/AdminPage";
import RequesterPage from "./pages/Requester/RequesterPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/organization" element={<OrganizationPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/requester" element={<RequesterPage />} />
    </Routes>
  );
}
