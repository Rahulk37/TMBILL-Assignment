import type { Request, Response } from "express";

const express = require("express");
const orderRoutes = require("./order.routes");
const analyticsRoutes = require("./analytics.routes");

const router = express.Router();

router.use(
  "/analytics",
  analyticsRoutes
);
router.get((_: Request, res: Response) => {
  res.json({
    success: true,
    message: "Server running",
  });
});

router.use("/orders", orderRoutes);

module.exports = router;