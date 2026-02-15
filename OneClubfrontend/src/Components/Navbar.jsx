import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#1f1e1e] px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-white text-xl font-bold">
        <FaStore className="text-indigo-500 text-2xl" />
        <span>MyStore</span>
      </Link>

      <div className="flex items-center gap-6 text-gray-300">
        <NavLink to="/" className="hover:text-white">Home</NavLink>
        <NavLink to="/about" className="hover:text-white">About</NavLink>
        <NavLink to="/cart" className="hover:text-white">Cart</NavLink>

        {!isAuthenticated ? (
          <NavLink to="/login" className="hover:text-white">
            Login
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;