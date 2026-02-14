import { Request, Response, NextFunction } from "express";
import { countWords } from "../utils/justification";

const MAX_WORDS_PER_DAY = parseInt(
  process.env.MAX_WORDS_PER_DAY || "80000",
  10,
);

// Store rate limit data: email -> { count, resetDate }
const rateLimitStore: Map<string, { count: number; resetDate: string }> =
  new Map();

export const rateLimitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email = req.email;

  if (!email) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const text = req.body;

  if (typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Invalid text provided" });
  }

  const wordCount = countWords(text);

  const today = new Date().toISOString().split("T")[0];

  let userLimit = rateLimitStore.get(email);

  if (!userLimit || userLimit.resetDate !== today) {
    userLimit = { count: 0, resetDate: today };
    rateLimitStore.set(email, userLimit);
  }

  if (userLimit.count + wordCount > MAX_WORDS_PER_DAY) {
    return res.status(402).json({ error: "Payment Required" });
  }

  userLimit.count += wordCount;

  next();
};
