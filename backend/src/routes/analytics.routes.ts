const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/orders-per-day", analyticsController.getOrdersPerDay);

router.get("/revenue-per-store", analyticsController.getRevenuePerStore);

router.get("/top-items", analyticsController.getTopSellingItems);

module.exports = router;
export {};
