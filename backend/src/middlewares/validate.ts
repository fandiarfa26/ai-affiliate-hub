import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { logger } from "../config/logger";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      logger.error(`Validation error: ${error.message}`);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    req.body = value;
    next();
  };
};
