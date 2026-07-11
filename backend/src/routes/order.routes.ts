const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const orderController = require("../controllers/order.controller");

const {
  createOrderSchema,
  updateStatusSchema,
} = require("../validators/order.validator");

router.post(
  "/",
  validate(createOrderSchema),
  orderController.createOrder
);

router.get(
  "/",
  orderController.getOrders
);

router.patch(
  "/:id/status",
  validate(updateStatusSchema),
  orderController.updateOrderStatus
);

module.exports = router;export {};