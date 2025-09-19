import { Router } from "express";
import { articleController } from "./article.controller";

const router = Router();

router.get("/", articleController.getAll);

export default router;
