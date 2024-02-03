import express, { Request, Response } from "express";
import { requireAuth } from "@ibtehazc/common";

const router = express.Router();

router.post("/api/products", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createProductRouter };
