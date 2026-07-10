const { Request, Response, NextFunction } = require("express");

const errorHandler = (
  err: Error,
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction
) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = {
  errorHandler,
};