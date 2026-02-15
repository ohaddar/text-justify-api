import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../auth";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

describe("authMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it("should pass with valid token", () => {
    const token = jwt.sign({ email: "test@example.com" }, JWT_SECRET);
    req.headers = { authorization: `Bearer ${token}` };

    authMiddleware(req as Request, res as Response, next);

    expect(req.email).toBe("test@example.com");
    expect(next).toHaveBeenCalled();
  });

  it("should reject without authorization header", () => {
    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject invalid token format", () => {
    req.headers = { authorization: "InvalidToken" };

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should reject invalid token", () => {
    req.headers = { authorization: "Bearer invalid.token.here" };

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
