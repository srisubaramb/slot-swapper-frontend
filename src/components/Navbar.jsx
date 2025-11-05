import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-700">
          SlotSwapper
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-600 font-medium items-center">
          <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link to="/marketplace" className="hover:text-indigo-600">Marketplace</Link>
          <Link to="/requests" className="hover:text-indigo-600">Requests</Link>
          <Link to="/history" className="hover:text-indigo-600">History</Link>
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 px-6 py-4 space-y-3 text-gray-700 font-medium">
          <Link to="/dashboard" className="block hover:text-indigo-600">Dashboard</Link>
          <Link to="/marketplace" className="block hover:text-indigo-600">Marketplace</Link>
          <Link to="/requests" className="block hover:text-indigo-600">Requests</Link>
          <Link to="/history" className="block hover:text-indigo-600">History</Link>
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
