import { Router, Request, Response } from "express";
import prisma from "../config/prisma";
import articleRoute from "../modules/article/article.route";

const router = Router();

//Simple Route
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend running..." });
});

router.get("/health", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ status: "ok", db: "connected" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DB error:", error.message);
    }
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

router.use("/articles", articleRoute);

export default router;
