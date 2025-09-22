import { Request, Response, NextFunction } from "express";
import { articleService } from "./article.service";
import { CreateArticleDTO, UpdateArticleDTO } from "./article.types";

export const articleController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await articleService.getAll();
      res.json({ success: true, data: articles });
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body as CreateArticleDTO;
      const article = await articleService.create(payload);
      return res.status(201).json({ success: true, data: article });
    } catch (err) {
      next(err);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id))
        return res.status(400).json({ success: false, message: "Invalid id" });
      const article = await articleService.getById(id);
      return res.status(200).json({ success: true, data: article });
    } catch (err) {
      next(err);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id))
        return res.status(400).json({ success: false, message: "Invalid id" });
      const payload = req.body as UpdateArticleDTO;
      const article = await articleService.update(id, payload);
      return res.status(200).json({ success: true, data: article });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id))
        return res.status(400).json({ success: false, message: "Invalid id" });
      const article = await articleService.delete(id);
      return res.status(200).json({ success: true, data: article });
    } catch (err) {
      next(err);
    }
  },
};
