const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/orders-per-day", analyticsController.getOrdersPerDay);

router.get("/revenue-per-store", analyticsController.getRevenuePerStore);
router.get("/", analyticsController.getArchivedOrders);
router.get("/top-items", analyticsController.getTopSellingItems);
router.post("/archive-old-orders", analyticsController.archiveOldOrders);


module.exports = router;
export {};
