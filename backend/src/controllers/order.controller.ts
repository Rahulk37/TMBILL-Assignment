import type { Request, Response, NextFunction } from "express";
const orderService = require("../services/order.service");

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("create order ", req.body);
    const order = await orderService.createOrder(req.body);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { store_id, page = 1, limit = 10 } = req.query;

    const result = await orderService.getOrders({
      store_id,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result.orders,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(id, status);

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
const deleteOrder = async (
  req: Request,
  res: Response
) => {
  const order =
    await orderService.deleteOrder(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    });
  }

  res.json({
    success: true,
    message: "Order deleted successfully",
    data: order,
  });
};
module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
};
