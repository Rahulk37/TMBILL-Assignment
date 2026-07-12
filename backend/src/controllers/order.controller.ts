import type { Request, Response, NextFunction } from "express";

const orderService = require("../services/order.service");
const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.createOrder(req.body);

    return successResponse(
      res,
      "Order created successfully",
      order,
      201,
    );
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

    return successResponse(
      res,
      "Orders fetched successfully",
      {
        orders: result.orders,
        pagination: result.pagination,
      },
    );
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { store_id, order_id } = req.params;

    const order = await orderService.getOrderById(store_id, order_id);

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(
      res,
      "Order fetched successfully",
      order,
    );
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
    const { store_id, order_id } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(
      store_id,
      order_id,
      status,
    );

    if (!updatedOrder) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(
      res,
      "Order status updated successfully",
      updatedOrder,
    );
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { store_id, order_id } = req.params;

    const order = await orderService.deleteOrder(store_id, order_id);

    if (!order) {
      return errorResponse(res, "Order not found", 404);
    }

    return successResponse(
      res,
      "Order deleted successfully",
      order,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};

export {};