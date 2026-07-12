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

module.exports = {
  getOrdersPerDay,
  getRevenuePerStore,
  getTopSellingItems,
};
