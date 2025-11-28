import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import AdminHomePage from "./pages/HomePage/AdminHomePage";
import OrganizationHomePage from "./pages/HomePage/OrganizationHomePage";
import UserHomePage from "./pages/HomePage/UserHomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home/admin" element={<AdminHomePage />} />
      <Route path="/home/organization" element={<OrganizationHomePage />} />
      <Route path="/home/user" element={<UserHomePage />} />
    </Routes>
  );
}
