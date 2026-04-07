/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.h1
          onClick={() => handleNav("/")}
          className="text-2xl font-bold text-gray-600 cursor-pointer"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          AQI Predictor
        </motion.h1>

        {/* Desktop Menu */}
        <motion.nav
          className="hidden md:flex space-x-8"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {["/", "/predict", "/about"].map((path, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + i * 0.06, duration: 0.35 }}
            >
              <NavLink
                to={path}
                className="text-gray-700 hover:text-blue-500 transition-colors duration-200 relative group"
              >
                {path === "/" ? "Home" : path === "/predict" ? "Predict AQI" : "About"}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>

        {/* Mobile Toggle */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ☰
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            {[
              { label: "Home",        path: "/" },
              { label: "Predict AQI", path: "/predict" },
              { label: "About",       path: "/about" },
            ].map(({ label, path }, i) => (
              <motion.button
                key={path}
                onClick={() => handleNav(path)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-500 transition-colors duration-200"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
