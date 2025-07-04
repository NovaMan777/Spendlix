import React, { useState, useEffect } from "react";
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlinePaperAirplane
} from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modalVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.98 }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    console.log('Report submitted:', formData);
    setReportSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', issue: '' });
      setReportSubmitted(false);
      setShowReportForm(false);
      setOpenSupport(false);
    }, 3000);
  };

  const handleReportClick = () => {
    setShowReportForm(true);
  };

  const handleBackToSupport = () => {
    setShowReportForm(false);
  };

  return (
    <>
      {/* Navbar */}
      <header
        className={`sticky top-0 z-[1000] transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm border-b border-gray-200" : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src="/logo.png"
                alt="SpenDix Logo"
                className="h-9 w-9 object-contain transition-transform hover:scale-110"
              />
              <h2 className="text-xl font-extrabold tracking-wide">
                <span className="text-green-500">Spen</span>
                <span className="text-gray-800">Dix</span>
              </h2>
            </motion.div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <motion.button
                className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100"
                onClick={() => setOpenSupport(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Contact Support"
              >
                <HiOutlineQuestionMarkCircle className="text-2xl text-gray-700" />
              </motion.button>

              <motion.button
                className="block lg:hidden p-2 rounded-full bg-white shadow-sm hover:bg-gray-100"
                onClick={() => setOpenSideMenu(!openSideMenu)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle Menu"
              >
                {openSideMenu ? (
                  <HiOutlineX className="text-2xl text-gray-700" />
                ) : (
                  <HiOutlineMenu className="text-2xl text-gray-700" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {openSideMenu && (
          <>
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-xl z-[999] lg:hidden border-l border-gray-200"
            >
              <SideMenu activeMenu={activeMenu} onClose={() => setOpenSideMenu(false)} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[900] lg:hidden"
              onClick={() => setOpenSideMenu(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {openSupport && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1001] bg-black/30 backdrop-blur-sm"
              onClick={() => setOpenSupport(false)}
            />
            <div className="fixed inset-0 z-[1002] flex items-center justify-center p-4">
              <motion.div
                variants={modalVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-gray-200">
                  <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-500" />
                  <div className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <HiOutlineQuestionMarkCircle className="absolute top-6 right-6 h-6 w-6 text-green-500 opacity-20" />
                        {!showReportForm ? (
                          <>
                            <h3 className="text-2xl font-semibold text-gray-900">How can we help?</h3>
                            <p className="mt-1 text-gray-500">We're here to assist you</p>
                          </>
                        ) : (
                          <>
                            <h3 className="text-2xl font-semibold text-gray-900">Report an Issue</h3>
                            <p className="mt-1 text-gray-500">Please provide details about your issue</p>
                          </>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setOpenSupport(false);
                          setShowReportForm(false);
                          setReportSubmitted(false);
                        }}
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                      >
                        <HiOutlineX className="h-5 w-5" />
                      </button>
                    </div>

                    {reportSubmitted ? (
                      <div className="mt-6 text-center py-8">
                        <div className="flex justify-center">
                          <HiOutlineCheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h4 className="mt-4 text-xl font-medium text-gray-900">Report Submitted Successfully!</h4>
                        <p className="mt-2 text-gray-500">We'll get back to you soon.</p>
                      </div>
                    ) : showReportForm ? (
                      <form onSubmit={handleReportSubmit} className="mt-6 space-y-4">
                        <div className="space-y-4">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <HiOutlineUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                              placeholder="Your Name"
                              required
                            />
                          </div>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <HiOutlineMail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                              placeholder="Your Email"
                              required
                            />
                          </div>
                          <div>
                            <textarea
                              name="issue"
                              value={formData.issue}
                              onChange={handleInputChange}
                              rows="4"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                              placeholder="Describe your issue..."
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-between pt-2">
                          <button
                            type="button"
                            onClick={handleBackToSupport}
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2"
                          >
                            <HiOutlinePaperAirplane className="h-5 w-5" />
                            Send Report
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="mt-6 space-y-4">
                          <SupportOption
                            icon={<HiOutlineMail className="h-5 w-5" />}
                            title="Email Support"
                            subtitle="support@spendix.com"
                            onClick={() => (window.location.href = "mailto:support@spendix.com")}
                          />
                          <SupportOption
                            icon={<HiOutlineExclamationCircle className="h-5 w-5" />}
                            title="Report an Issue"
                            subtitle="Let us know about problems"
                            onClick={handleReportClick}
                          />
                        </div>
                        <p className="mt-6 pt-6 border-t text-center text-sm text-gray-500 border-gray-100">
                          Typically respond within 24 hours
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SupportOption = ({ icon, title, subtitle, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-green-300"
  >
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-50 text-green-600 group-hover:bg-green-100">
      {icon}
    </div>
    <div className="text-left">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </motion.button>
);

export default Navbar;
