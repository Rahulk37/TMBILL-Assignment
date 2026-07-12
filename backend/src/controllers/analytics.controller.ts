import type { Request, Response, NextFunction } from "express";

const analyticsService = require("../services/analytics.service");
const {
  successResponse,
} = require("../utils/response");

const getOrdersPerDay = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await analyticsService.getOrdersPerDay();

    return successResponse(
      res,
      "Orders per day fetched successfully",
      data,
    );
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

    return successResponse(
      res,
      "Revenue per store fetched successfully",
      data,
    );
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

    return successResponse(
      res,
      "Top selling items fetched successfully",
      data,
    );
  } catch (error) {
    next(error);
  }
};

const archiveOldOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const days = Number(req.body.days ?? 30);

    const result = await analyticsService.archiveOldOrders(days);

    return successResponse(
      res,
      "Orders archived successfully",
      result,
    );
  } catch (error) {
    next(error);
  }
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

    return successResponse(
      res,
      "Archived orders fetched successfully",
      {
        archivedOrders: result.archivedOrders,
        pagination: result.pagination,
      },
    );
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