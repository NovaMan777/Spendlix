import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadImage";
import {
  FaGem, FaUserTie, FaFingerprint, FaShieldAlt, FaRocket,
  FaChartLine, FaLock, FaEnvelope, FaChevronRight, FaUser
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const premiumFeatures = [
  {
    icon: <FaShieldAlt className="text-blue-400" size={20} />,
    title: "Military-Grade Security",
    description: "AES-256 encryption with zero-knowledge protocol"
  },
  {
    icon: <FaRocket className="text-purple-400" size={20} />,
    title: "Ultra-Fast Performance",
    description: "Global CDN with edge computing"
  },
  {
    icon: <FaChartLine className="text-green-400" size={20} />,
    title: "Advanced Analytics",
    description: "Real-time insights and reporting"
  },
  {
    icon: <FaFingerprint className="text-yellow-400" size={20} />,
    title: "Biometric Authentication",
    description: "Facial recognition & fingerprint login"
  }
];

const InputField = ({ id, label, type, value, onChange, icon, placeholder }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="mb-6"
  >
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  </motion.div>
);

const SignUp = () => {
  // const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      // let profileImageUrl = "";
      // if (profilePic) {
      //   const imgUploadRes = await uploadImage(profilePic);
      //   profileImageUrl = imgUploadRes.imageUrl || "";
      // }

      const { data } = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        // profileImageUrl
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        updateUser(data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden" style={{ height: '100vh', width: '100vw' }}>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 30, density: { enable: true, value_area: 800 } },
              color: { value: "#3B82F6" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: "#3B82F6", opacity: 0.4, width: 1 },
              move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
              events: { onhover: { enable: true, mode: "grab" } }
            }
          }}
        />
      </div>

      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-12 flex-col justify-between relative overflow-hidden"
        style={{ height: '100vh' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-20"></div>

        <div className="relative z-10 text-white">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center mb-2"
          >
            <FaGem className="text-blue-300 mr-2" size={24} />
            <span className="text-blue-300 font-medium">SIGN IN PAGE</span>
          </motion.div>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mb-4 leading-tight"
          >
            Join Our <br /><span className="text-blue-300">Exclusive</span> Community
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-blue-200 text-xl max-w-lg"
          >
            Create your account to Join Thousands Managing Their Money Smarter..
          </motion.p>
        </div>

        <div className="relative z-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFeatures(!showFeatures)}
            className="flex items-center text-blue-100 hover:text-white mb-6 transition-colors duration-200"
          >
            <span className="mr-2">Explore Premium Features</span>
            <motion.span
              animate={{ rotate: showFeatures ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaChevronRight />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showFeatures && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {premiumFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">{feature.icon}</div>
                        <div>
                          <h3 className="text-white font-medium">{feature.title}</h3>
                          <p className="text-blue-200 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <FaUserTie className="text-white" size={20} />
            </div>
            <div>
              <p className="text-blue-200 text-sm">Trusted by 1M+ User</p>
              <p className="text-white font-medium">Best Experience & Security</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center min-h-screen p-2 bg-transparent relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5"
        >
          <div className="text-center space-y-1">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg mb-3"
            >
              <FaUser className="h-5 w-5 text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-bold text-gray-900"
            >
              Create Account
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-600"
            >
              Join our premium platform today
              <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-sm text-blue-800 shadow-sm">
                <span>
                  <strong>Note:</strong> If registration fails, please wait a few seconds <strong>Refrace</strong>and try again. The server is hosted on Render, which may take a moment to wake up or respond due to slower deployment times. Thank you for your patience!
                </span>
              </div>
            </motion.p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-red-100 p-3 border border-red-400"
            >
              <div className="flex items-center text-red-700 text-sm">
                <svg className="h-4 w-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}

          <form className="space-y-3" onSubmit={handleSignUp}>
            {/* Commented out profile image section */}
            {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
              <div className="relative w-16 h-16 group">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                  {profilePic ? (
                    <img src={URL.createObjectURL(profilePic)} alt="Profile" className="w-full h-full object-cover" />
                  ) : <FaUser className="h-6 w-6 text-gray-400" />}
                </div>
                <label htmlFor="profilePic" className="absolute bottom-0 right-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <input id="profilePic" type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="hidden" />
                </label>
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs text-yellow-500 mt-1 mb-1">
              Note: Profile picture and name cannot be changed later
            </motion.p> */}

            <InputField
              id="fullName"
              label="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<FaUser className="h-5 w-5 text-gray-400" />}
              placeholder="John Doe"
            />

            <InputField
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope className="h-5 w-5 text-gray-400" />}
              placeholder="your@example.com"
            />

            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock className="h-5 w-5 text-gray-400" />}
              placeholder="exp: P@ssw0rd (min 8 chars)"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative w-full flex justify-center py-2.5 px-4 text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg ${isLoading ? "opacity-90 cursor-not-allowed" : ""
                  }`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <FaChevronRight className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors" />
                  </motion.span>
                </span>
                {isLoading ? (
                  <>
                    <svg className="animate-spin mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8..." />
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  "Join Now"
                )}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-3 mt-3 border-t border-gray-200 text-center"
          >
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;