import React, { useEffect, useState } from "react";
import {
  LuHandCoins,
  LuWalletMinimal,
  LuTrendingUp,
  LuPiggyBank,
} from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { FiArrowUpRight, FiActivity } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";

const shimmerEffect = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .shimmer-bg {
    animation: shimmer 1.5s infinite linear;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.05) 100%
    );
    background-size: 200% 100%;
  }
`;

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const cardColors = [
    "from-indigo-700/10 to-indigo-500/10",
    "from-emerald-700/10 to-emerald-500/10",
    "from-rose-700/10 to-rose-500/10",
    "from-amber-700/10 to-amber-500/10",
  ];

  const InfoCard = ({ icon, label, value, trend, loading, colorIndex }) => (
    <motion.div
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-3xl p-6 backdrop-blur-md bg-white/85 border border-white/30 shadow-2xl overflow-hidden group bg-gradient-to-br ${cardColors[colorIndex]} hover:shadow-3xl transition-all duration-300 ease-in-out`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className="p-3.5 rounded-xl bg-white/95 text-indigo-700 shadow-lg transition-transform group-hover:scale-105">
            {icon}
          </div>
          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-wide ${
                trend.value > 0
                  ? "bg-emerald-100/90 text-emerald-900"
                  : "bg-rose-100/90 text-rose-900"
              } shadow-sm`}
            >
              {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
            </motion.div>
          )}
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">{label}</p>
          {loading ? (
            <div className="h-9 w-2/3 mt-2 shimmer-bg rounded-lg" />
          ) : (
            <h3 className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
              ₹{value}
            </h3>
          )}
        </div>
      </div>
    </motion.div>
  );

  const TabButton = ({ name, icon, active }) => (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.94 }}
      onClick={() => setActiveTab(name)}
      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 ${
        active === name
          ? "bg-indigo-700 text-white shadow-md"
          : "text-gray-500 hover:bg-gray-50/90 hover:text-indigo-700"
      }`}
    >
      {icon}
      {!isMobile && <span className="ml-2.5 capitalize">{name}</span>}
    </motion.button>
  );

  return (
    <DashboardLayout activeMenu="Dashboard">
      <style>{shimmerEffect}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 font-inter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Financial Dashboard
            </h1>
            <p className="text-gray-400 mt-2 text-base md:text-lg tracking-wide">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5 md:mt-0 flex space-x-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/30"
          >
            <TabButton
              name="overview"
              icon={<FiActivity className="w-5 h-5" />}
              active={activeTab}
            />
            <TabButton
              name="analytics"
              icon={<LuTrendingUp className="w-5 h-5" />}
              active={activeTab}
            />
            <TabButton
              name="reports"
              icon={<LuPiggyBank className="w-5 h-5" />}
              active={activeTab}
            />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <InfoCard
              icon={<IoMdCard className="w-7 h-7" />}
              label="Total Balance"
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              trend={{ value: 12.5 }}
              loading={loading}
              colorIndex={0}
            />
            <InfoCard
              icon={<LuWalletMinimal className="w-7 h-7" />}
              label="Total Income"
              value={addThousandSeparator(dashboardData?.totalIncome || 0)}
              trend={{ value: 8.2 }}
              loading={loading}
              colorIndex={1}
            />
            <InfoCard
              icon={<LuHandCoins className="w-7 h-7" />}
              label="Total Expenses"
              value={addThousandSeparator(dashboardData?.totalExpense || 0)}
              trend={{ value: -4.3 }}
              loading={loading}
              colorIndex={2}
            />
            <InfoCard
              icon={<FiArrowUpRight className="w-7 h-7" />}
              label="Net Savings"
              value={addThousandSeparator(
                (dashboardData?.totalIncome || 0) -
                  (dashboardData?.totalExpense || 0)
              )}
              trend={{ value: 5.7 }}
              loading={loading}
              colorIndex={3}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <div className="space-y-10">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
                loading={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
                loading={loading}
              />
            </motion.div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <Last30DaysExpenses
                data={dashboardData?.last30daysExpenses?.transactions || []}
                loading={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <RecentIncomeWithChart
                data={
                  dashboardData?.last60DaysIncome?.transaction?.slice(0, 6) || []
                }
                totalIncome={dashboardData?.totalIncome || 0}
                loading={loading}
              />
            </motion.div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <ExpenseTransactions
                transactions={dashboardData?.last30daysExpenses?.transactions || []}
                onSeeMore={() => navigate("/expense")}
                loading={loading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <RecentIncome
                transactions={dashboardData?.last60DaysIncome?.transaction || []}
                onSeeMore={() => navigate("/income")}
                loading={loading}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;