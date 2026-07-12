import type { Request, Response, NextFunction } from "express";

const storeService = require("../services/store.service");

const createStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeService.createStore(req.body);

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const getStores = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stores = await storeService.getStores();

    return res.status(200).json({
      success: true,
      message: "Stores fetched successfully",
      data: stores,
    });
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
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store fetched successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const updateStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeService.updateStore(req.params.store_id, req.body);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store updated successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const store = await storeService.deleteStore(req.params.store_id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Store deleted successfully",
      data: store,
    });
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
