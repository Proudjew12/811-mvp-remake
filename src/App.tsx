import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
