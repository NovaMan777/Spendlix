// Import dependencies
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaEnvelope, FaLock, FaUser, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiLogIn, FiZap, FiShield } from "react-icons/fi";

// Import utils and context
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!fullName) return setError("Please enter your name"), setIsLoading(false);
    if (!validateEmail(email)) return setError("Please enter a valid email address"), setIsLoading(false);
    if (!password) return setError("Please enter the password"), setIsLoading(false);

    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      
      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900 to-indigo-900 p-8 flex-col justify-between relative overflow-hidden"
      >
        {/* Background Circles */}
        {[
          ["top-1/4 left-1/4", "w-64 h-64", "bg-white/5", 15],
          ["top-1/3 right-1/4", "w-48 h-48", "bg-indigo-400/10", 20],
          ["bottom-1/4 right-1/3", "w-56 h-56", "bg-blue-400/10", 25],
        ].map(([position, size, color, duration], i) => (
          <motion.div
            key={i}
            animate={{ x: [0, i % 2 === 0 ? 20 : -20, 0], y: [0, 20, 0], rotate: [0, 180, 360] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
            className={`absolute ${position} ${size} rounded-full ${color} mix-blend-overlay filter blur-3xl`}
          />
        ))}

        {/* Title */}
        <div className="relative z-10 text-white">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl font-bold mb-2">Join Us Today</motion.h1>
          <motion.p initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-blue-200 text-lg">Start your journey with our platform</motion.p>
        </div>

        {/* Features */}
        <div className="relative z-10 space-y-4">
          {[["Secure Registration", "Your data is protected with 256-bit encryption", <FiShield />],
            ["Instant Access", "Get started immediately after registration", <FiZap />]]
            .map(([title, subtitle, icon], i) => (
              <motion.div
                key={i}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.2 }}
                className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">{icon}</div>
                <div>
                  <h3 className="text-white font-medium text-base">{title}</h3>
                  <p className="text-blue-200 text-sm">{subtitle}</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-hidden">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          {/* Title */}
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg mb-4">
              <FaUserShield className="h-8 w-8 text-white" />
            </motion.div>
            <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl font-extrabold text-gray-900">Create Account</motion.h2>
            <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-1 text-sm text-gray-600">
              Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Log in Here</Link>
            </motion.p>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-red-50 p-3 border border-red-100 mt-4">
              <div className="flex items-start space-x-2">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSignUp}>
            {/* Profile Pic */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex justify-center">
              <div className="relative w-20 h-20 group">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                  {profilePic ? (
                    <img src={URL.createObjectURL(profilePic)} alt="Profile" className="w-full h-full object-cover" />
                  ) : <FaUser className="h-8 w-8 text-gray-400" />}
                </div>
                <label htmlFor="profilePic" className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <input id="profilePic" type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
                </label>
              </div>
            </motion.div>

            {/* Warning Message */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center text-xs text-yellow-800 bg-yellow-100 border border-yellow-200 px-3 py-1 rounded-lg">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Note: Your name and profile picture cannot be changed after registration</span>
              </div>
            </motion.div>

            {/* Full Name, Email, Password */}
            {[["Full Name", "text", fullName, setFullName, FaUser, "name", "John Doe"],
              ["Email Address", "email", email, setEmail, FaEnvelope, "email", "you@example.com"],
              ["Password", "password", password, setPassword, FaLock, "new-password", "••••••••"]]
              .map(([label, type, value, setter, Icon, autoComplete, placeholder], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <div className="relative">
                    <input
                      type={type}
                      autoComplete={autoComplete}
                      required
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      placeholder={placeholder}
                      className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Icon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md hover:shadow-lg ${isLoading ? "opacity-90 cursor-not-allowed" : ""}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FiLogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                </span>
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </>
                ) : "Sign Up"}
              </button>
            </motion.div>
          </form>

          {/* Social Links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="pt-4 mt-4 border-t border-gray-200">
            <div className="flex justify-center space-x-3">
              {[
                ["https://github.com/sahilmd01", FaGithub],
                ["https://linkedin.com/in/codewithkinu", FaLinkedin],
              ].map(([url, Icon], i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 text-gray-700 hover:text-gray-900 shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-2 text-center text-xs text-gray-500">Connect with us</motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;