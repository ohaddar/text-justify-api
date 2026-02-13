import { Router, Request, Response } from "express";
import { justifyText } from "../utils/justification";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {
  try {
    const text = req.body as string;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Invalid text provided" });
    }

    const justifiedText = justifyText(text, 80);

    res.setHeader("Content-Type", "text/plain");
    return res.send(justifiedText);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
