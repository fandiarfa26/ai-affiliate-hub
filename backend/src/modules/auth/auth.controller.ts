import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { LoginDTO, RegisterDTO } from "./auth.types";
import { logger } from "../../config/logger";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    const request = req.body as RegisterDTO;
    try {
      const user = await authService.register(request);
      logger.info("User registered", { email: user.email, id: user.id });
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "EMAIL_EXISTS") {
          logger.info("Registered failed - email exists", {
            email: request.email,
          });
          return res
            .status(409)
            .json({ success: false, message: "Email already exists" });
        }
      }
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    const request = req.body as LoginDTO;
    try {
      const { token } = await authService.login(request);
      logger.info("Login user", { email: request.email });
      return res
        .status(200)
        .json({ success: true, data: { accessToken: token } });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "INVALID_CREDENTIALS") {
          logger.info("Login failed", { email: request.email });
          return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
      }
      next(error);
    }
  },
};
