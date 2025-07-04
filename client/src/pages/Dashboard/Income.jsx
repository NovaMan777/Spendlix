import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiDownload,
  FiPlus,
  FiActivity,
  FiTrendingUp,
  FiPieChart,
  FiDollarSign
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import { addThousandSeparator } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

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

const Income = () => {
  useUserAuth();
  const navigate = useNavigate();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) setIncomeData(response.data);
    } catch (error) {
      toast.error("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    if (!source.trim()) return toast.error("Source is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be a number > 0");
    if (!date) return toast.error("Date is required.");

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, { source, amount, date, icon });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = () => {
    toast.success("Export feature coming soon!");
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  const filteredTransactions = incomeData.filter((transaction) => {
    if (activeTab === "all") return true;
    return true;
  });

  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const last30DaysIncome = incomeData
    .filter(item => new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .reduce((sum, item) => sum + item.amount, 0);

  const cardColors = [
    "from-indigo-700/10 to-indigo-500/10",
    "from-emerald-700/10 to-emerald-500/10",
    "from-amber-700/10 to-amber-500/10",
    "from-purple-700/10 to-purple-500/10"
  ];

  const TabButton = ({ name, icon, active }) => (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setActiveTab(name)}
      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all ${active === name
        ? "bg-indigo-700 text-white shadow-md"
        : "text-gray-500 hover:bg-gray-50/90 hover:text-indigo-700"
        }`}
    >
      {icon}
      {!isMobile && <span className="ml-2.5 capitalize">{name}</span>}
    </motion.button>
  );

  const StatCard = ({ icon, label, value, loading, colorIndex, noCurrency = false }) => (

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
        </div>
        <div className="mt-5">
          <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">{label}</p>
          {loading ? (
            <div className="h-9 w-2/3 mt-2 shimmer-bg rounded-lg" />
          ) : (
            <h3 className="text-2xl font-bold text-gray-900 mt-1.5 tracking-tight">
              {noCurrency ? addThousandSeparator(value) : `₹${addThousandSeparator(value)}`}
            </h3>

          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout activeMenu="Income">
      <style>{shimmerEffect}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 font-inter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Income Dashboard
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
            className="mt-5 md:mt-0 flex space-x-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadIncomeDetails}
              className="flex items-center px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-xl text-gray-700 hover:bg-gray-50/90 shadow-md border border-white/30 transition-all"
            >
              <FiDownload className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Export</span>}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpenAddIncomeModal(true)}
              className="flex items-center px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg"
            >
              <FiPlus className="w-5 h-5" />
              {!isMobile && <span className="ml-2.5">Add Income</span>}
            </motion.button>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex space-x-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/30">
          <TabButton
            name="All"
            icon={<FiActivity className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="Recurring"
            icon={<FiTrendingUp className="w-5 h-5" />}
            active={activeTab}
          />
          <TabButton
            name="One-time"
            icon={<FiPieChart className="w-5 h-5" />}
            active={activeTab}
          />
        </div>

        {/* Stats Grid */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <StatCard
              icon={<FiDollarSign className="w-7 h-7" />}
              label="Total Income"
              value={totalIncome}
              loading={loading}
              colorIndex={0}
            />
            <StatCard
              icon={<FiTrendingUp className="w-7 h-7" />}
              label="Last 30 Days"
              value={last30DaysIncome}
              loading={loading}
              colorIndex={1}
            />
            <StatCard
              icon={<FiPieChart className="w-7 h-7" />}
              label="Transactions"
              value={incomeData.length}
              loading={loading}
              colorIndex={2}
              noCurrency
            />
            <StatCard
              icon={<FiActivity className="w-7 h-7" />}
              label="Avg. Monthly"
              value={incomeData.length > 0 ? Math.round(totalIncome / (incomeData.length)) : 0}
              loading={loading}
              colorIndex={3}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30"
            >
              <IncomeOverview
                transactions={filteredTransactions}
                onAddIncome={() => setOpenAddIncomeModal(true)}
                currency="₹"
              />
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 overflow-hidden"
            >
              <IncomeList
                transactions={filteredTransactions}
                loading={loading}
                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                onDownload={handleDownloadIncomeDetails}
                currency="₹"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Modals */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add New Income"
          size="lg"
          glassEffect
        >
          <AddIncomeForm
            onAddIncome={handleAddIncome}
            onCancel={() => setOpenAddIncomeModal(false)}
            currency="₹"
          />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Confirm Deletion"
          size="md"
          glassEffect
        >
          <DeleteAlert
            content="This action cannot be undone. All data associated with this income will be permanently removed."
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;