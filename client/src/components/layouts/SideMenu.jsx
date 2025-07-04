import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { CharAvatar } from "../Cards/CharAvatar";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] sticky top-[61px] z-20 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 p-5 flex flex-col justify-between">
      {/* Profile Section */}
      <div>
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-6">
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow ring-2 ring-primary-500/20"
              />
            ) : (
              <div className="relative">
                <CharAvatar
                  fullName={user?.fullName}
                  width="w-20"
                  height="h-20"
                  style="text-xl font-medium"
                />
                <div className="absolute inset-0 rounded-full border-4 border-white shadow ring-2 ring-primary-500/20" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow">
              <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
            </div>
          </motion.div>
          <h5 className="text-gray-950 font-semibold text-center leading-6 truncate max-w-[80%]">
            {user?.fullName || "User"}
          </h5>
          <p className="text-sm text-primary-600 font-medium">
            Welcome! to <span className="text-blue-700 font-bold">SpenDix</span>
          </p>

        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {SIDE_MENU_DATA.map((item, index) => (
            <motion.button
              key={`menu_${index}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-4 text-sm font-medium transition-all duration-200 py-3 px-5 rounded-lg ${activeMenu === item.label
                  ? "text-primary-600 bg-primary-50 shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => handleClick(item.path)}
            >
              <div
                className={`p-2 rounded-md ${activeMenu === item.label
                    ? "bg-primary-100 text-primary-600"
                    : "bg-gray-100 text-gray-500"
                  }`}
              >
                <item.icon className="text-lg" />
              </div>
              <span>{item.label}</span>
              {activeMenu === item.label && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1.5 h-5 bg-primary-500 rounded-full ml-auto"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{
          x: 5,
          backgroundColor: "#FEF2F2",
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full mt-4 flex items-center gap-3 text-sm font-medium text-red-500 hover:text-red-600 py-3 px-5 rounded-xl transition-colors group"
      >
        <div className="p-2 rounded-md bg-red-50 group-hover:bg-red-100 transition-colors">
          <FiLogOut className="text-lg" />
        </div>
        <span>Sign Out</span>
      </motion.button>
    </div>
  );
};

export default SideMenu;
