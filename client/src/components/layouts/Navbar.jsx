import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white shadow-sm border-b border-gray-200" 
        : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/logo.png"
              alt="SpenDix Logo"
              className="h-9 w-9 object-contain transition-transform duration-300 hover:scale-110"
            />
            <h2 className="text-xl font-extrabold tracking-wide">
              <span className="text-blue-500">Spen</span>
              <span className="text-gray-800">Dix</span>
            </h2>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="block lg:hidden p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-all duration-200"
            onClick={() => setOpenSideMenu(!openSideMenu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl text-gray-700" />
            ) : (
              <HiOutlineMenu className="text-2xl text-gray-700" />
            )}
          </motion.button>

          {/* Desktop Navigation - Placeholder for future items */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Add desktop navigation items here */}
          </div>
        </div>
      </div>

      {/* Mobile Side Menu with Animation */}
      <AnimatePresence>
        {openSideMenu && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-xl z-40 lg:hidden border-l border-gray-200"
            >
              <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
            </motion.div>
            
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-30 lg:hidden"
              onClick={() => setOpenSideMenu(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;