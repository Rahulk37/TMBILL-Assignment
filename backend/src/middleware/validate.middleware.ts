import type { Request, Response,NextFunction } from "express";

const validate = (schema:any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse(req.body);

      req.body = validatedData;

      next();
    } catch (error:any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
};

module.exports = validate;