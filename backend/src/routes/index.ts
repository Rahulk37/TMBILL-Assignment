import type { Request, Response } from "express";

const express = require("express");
const orderRoutes = require("./order.routes");
const storeRoutes = require("./store.routes");
const analyticsRoutes = require("./analytics.routes");

const router = express.Router();

router.use("/analytics", analyticsRoutes);

router.use("/orders", orderRoutes);
router.use("/stores", storeRoutes);

module.exports = router;
