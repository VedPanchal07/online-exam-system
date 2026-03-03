import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import AdminPanel from "./pages/AdminPanel";
import MyResults from "./pages/MyResults";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam/:id" element={<Exam />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/my-results" element={<MyResults />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/navbar" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;