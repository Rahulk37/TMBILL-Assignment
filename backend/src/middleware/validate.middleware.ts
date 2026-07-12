import type { Request, Response, NextFunction } from "express";

const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = validatedData.body;

      next();
    } catch (error: any) {
      console.log(error);

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.issues,
      });
    }
  };
};

module.exports = validate;
export {};
