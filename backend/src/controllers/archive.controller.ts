const archiveService = require("../services/archive.service");
import type { Request, Response, NextFunction } from "express";
const archiveOldOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await archiveService.archiveOldOrders();

    return res.status(200).json({
      success: true,
      message:
        "Orders archived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  archiveOldOrders,
};