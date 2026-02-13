import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

// Extend Express Request to include email
declare global {
  namespace Express {
    interface Request {
      email?: string;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    req.email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
