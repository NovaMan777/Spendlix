const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.route("/").get(protect, getDashboardData);

module.exports = router;
