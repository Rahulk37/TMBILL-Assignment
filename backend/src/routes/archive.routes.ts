const express = require("express");

const router = express.Router();

const archiveController = require("../controllers/archive.controller");

router.post(
  "/archive-old-orders",
  archiveController.archiveOldOrders
);

module.exports = router;export {};