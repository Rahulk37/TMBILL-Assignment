const analyticsService = require("../services/analytics.service");
import type { Request, Response, NextFunction } from "express";

const getOrdersPerDay = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await analyticsService.getOrdersPerDay();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getRevenuePerStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await analyticsService.getRevenuePerStore();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getTopSellingItems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await analyticsService.getTopSellingItems();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
const archiveOldOrders = async (req: Request, res: Response) => {
  const days = Number(req.body.days ?? 30);

  const result = await analyticsService.archiveOldOrders(days);

  res.json({
    success: true,
    data: result,
  });
};

const getArchivedOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { store_id, page = 1, limit = 10 } = req.query;

    const result = await analyticsService.getArchivedOrdersApi({
      store_id,
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json({
      success: true,
      message: "Archived orders fetched successfully",
      data: result.archivedOrders,   // ✅ Fix
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopSellingItems,
  archiveOldOrders,
  getArchivedOrders,
};
