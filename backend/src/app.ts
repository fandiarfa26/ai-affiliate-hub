import express, { Request, Response } from "express";
import cors from "cors";
import prismaClient from "./prisma-client";

const app = express();
app.use(cors());
app.use(express.json());

// Simple Route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend running..." });
});

app.get("/health", async (req: Request, res: Response) => {
  try {
    await prismaClient.$connect();
    res.json({ status: "ok", db: "connected" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("DB error:", error.message);
    }
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

export default app;
