import { Router } from "express";
import { validate } from "../../middlewares/validate";
import { loginValidation, registerValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", validate(registerValidation), authController.register);
router.post("/login", validate(loginValidation), authController.login);

export default router;
