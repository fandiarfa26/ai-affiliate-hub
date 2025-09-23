import { Router } from "express";
import { articleController } from "./article.controller";
import { validate } from "../../middlewares/validate";
import {
  createArticleValidation,
  updateArticleValidation,
} from "./article.validation";

const router = Router();

router.get("/", articleController.getAll);
router.post("/", validate(createArticleValidation), articleController.create);
router.get("/:id", articleController.getById);
router.put("/:id", validate(updateArticleValidation), articleController.update);
router.delete("/:id", articleController.delete);

export default router;
