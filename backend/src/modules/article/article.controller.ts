import { Request, Response, NextFunction } from "express";
import { articleService } from "./article.service";

export const articleController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const articles = await articleService.getAll();
      res.json({ success: true, data: articles });
    } catch (error) {
      next(error);
    }
  },
};
