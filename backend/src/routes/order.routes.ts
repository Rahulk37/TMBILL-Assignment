import express from "express";

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const orderController = require("../controllers/order.controller");

const {
  createOrderSchema,
  updateStatusSchema,
} = require("../validators/order.validator");

router.post("/", validate(createOrderSchema), orderController.createOrder);

router.get("/", orderController.getOrders);

router.get("/:store_id/:order_id", orderController.getOrderById);

router.patch(
  "/:store_id/:order_id/status",
  validate(updateStatusSchema),
  orderController.updateOrderStatus,
);

router.patch("/:store_id/:order_id/delete", orderController.deleteOrder);

module.exports = router;
export {};
