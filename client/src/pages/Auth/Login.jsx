import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import {
  FaGithub, FaLinkedin, FaUserShield, FaEnvelope, FaLock
} from "react-icons/fa";
import { FiZap, FiShield, FiLogIn } from "react-icons/fi";
import { motion } from "framer-motion";

const iconCards = [
  {
    icon: <FiShield className="h-6 w-6 text-white" />,
    title: "Enterprise Security",
    desc: "256-bit encryption for your data",
    delay: 0.6,
  },
  {
    icon: <FiZap className="h-6 w-6 text-white" />,
    title: "Lightning Fast",
    desc: "Optimized for maximum performance",
    delay: 0.8,
  },
];

const InputField = ({ id, label, type, value, onChange, icon, placeholder, autoComplete, link }) => (
  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: type === "password" ? 0.5 : 0.4 }}>
    <div className="flex justify-between items-center mb-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      {link && <Link to={link.href} className="text-sm text-blue-600 hover:text-blue-500">{link.text}</Link>}
    </div>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="block w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        {icon}
      </div>
    </div>
  </motion.div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter the password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const { data } = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Panel */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden">
        {[20, -20, 20].map((x, i) => (
          <motion.div
            key={i}
            animate={{ x: [0, x, 0], y: [0, 20, 0], rotate: [0, x > 0 ? 360 : -360] }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
            className={`absolute ${i === 0 ? 'top-1/4 left-1/4 w-64' : i === 1 ? 'top-1/3 right-1/4 w-48' : 'bottom-1/4 right-1/3 w-56'} h-56 rounded-full bg-white/10 mix-blend-overlay filter blur-3xl`}
          />
        ))}
        <div className="relative z-10 text-white">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-4">Welcome Back</motion.h1>
          <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-blue-200 text-xl">Your premium workspace awaits</motion.p>
        </div>
        <div className="relative z-10 space-y-6">
          {iconCards.map(({ icon, title, desc, delay }, idx) => (
            <motion.div key={idx} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay }}
              className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">{icon}</div>
              <div><h3 className="text-white font-medium text-lg">{title}</h3><p className="text-blue-200">{desc}</p></div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }}
              className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg mb-6">
              <FaUserShield className="h-10 w-10 text-white" />
            </motion.div>
            <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-3xl font-extrabold text-gray-900">Secure Login</motion.h2>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-2 text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign in Here</Link>
            </motion.p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-50 p-4 border border-red-100">
              <div className="flex items-center text-red-800">
                <svg className="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16z..." /></svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            </motion.div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <InputField
                id="email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<FaLock className="h-5 w-5 text-gray-400" />}
                placeholder="••••••••"
                autoComplete="current-password"
                link={{ text: "Forgot password?", href: "/forgot-password" }}
              />
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative w-full flex justify-center py-4 px-4 text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg ${isLoading ? 'opacity-90 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  <motion.span animate={{ x: isHovered ? 5 : 0 }} transition={{ type: "spring", stiffness: 500 }}>
                    <FiLogIn className="h-6 w-6 text-blue-300" />
                  </motion.span>
                </span>
                {isLoading ? (
                  <>
                    <svg className="animate-spin mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8..." />
                    </svg>
                    Signing in...
                  </>
                ) : 'Log in'}
              </button>
            </motion.div>
          </form>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="pt-6 mt-6 border-t text-center">
            <div className="flex justify-center space-x-4">
              {[
                { href: "https://github.com/sahilmd01", icon: <FaGithub /> },
                { href: "https://linkedin.com/in/codewithkinu", icon: <FaLinkedin /> },
               
              ].map((link, i) => (
                <motion.a key={i} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  href={link.href} target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shadow-sm overflow-hidden">
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
              className="mt-3 text-xs text-gray-500">Connect with me</motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
