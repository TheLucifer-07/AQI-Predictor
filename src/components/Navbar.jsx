import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1
          onClick={() => handleNav("/")}
          className="text-2xl font-bold text-gray-600 cursor-pointer"
        >
          AQI Predictor
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </NavLink>

          <NavLink to="/predict" className="text-gray-700 hover:text-blue-500">
            Predict AQI
          </NavLink>

          <NavLink to="/about" className="text-gray-700 hover:text-blue-500">
            About
          </NavLink>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <button
            onClick={() => handleNav("/")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
          >
            Home
          </button>

          <button
            onClick={() => handleNav("/predict")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
          >
            Predict AQI
          </button>

          <button
            onClick={() => handleNav("/about")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-500"
          >
            About
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;