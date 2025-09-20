import { Router } from "express";
import { articleController } from "./article.controller";

const router = Router();

router.get("/", articleController.getAll);
router.post("/", articleController.create);
router.get("/:id", articleController.getById);

export default router;
