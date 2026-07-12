import type { Request, Response, NextFunction } from "express";

const storeService = require("../services/store.service");
const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const store = await storeService.createStore(req.body);

    return successResponse(
      res,
      "Store created successfully",
      store,
      201,
    );
  } catch (error) {
    next(error);
  }
};

const getStores = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const stores = await storeService.getStores({ page, limit });

    return successResponse(
      res,
      "Stores fetched successfully",
      stores,
    );
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const store = await storeService.getStoreById(req.params.store_id);

    if (!store) {
      return errorResponse(res, "Store not found", 404);
    }

    return successResponse(
      res,
      "Store fetched successfully",
      store,
    );
  } catch (error) {
    next(error);
  }
};

const updateStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const store = await storeService.updateStore(
      req.params.store_id,
      req.body,
    );

    if (!store) {
      return errorResponse(res, "Store not found", 404);
    }

    return successResponse(
      res,
      "Store updated successfully",
      store,
    );
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const store = await storeService.deleteStore(req.params.store_id);

    if (!store) {
      return errorResponse(res, "Store not found", 404);
    }

    return successResponse(
      res,
      "Store deleted successfully",
      store,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStore,
  deleteStore,
};