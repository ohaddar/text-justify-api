import { Request, Response, NextFunction } from "express";
import { rateLimitMiddleware } from "../rateLimit";

describe("rateLimitMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { email: "test@example.com", body: "" };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should allow requests under limit", () => {
    req.body = "hello world";

    rateLimitMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should block requests over 80000 words", () => {
    const largeText = "word ".repeat(80001);
    req.body = largeText;

    rateLimitMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(402);
    expect(next).not.toHaveBeenCalled();
  });

  it("should reject without email", () => {
    req.email = undefined;
    req.body = "test";

    rateLimitMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it("should track different users separately", () => {
    req.body = "word ".repeat(1000);

    rateLimitMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();

    req.email = "other@example.com";
    rateLimitMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledTimes(2);
  });

  it("should reject invalid text", () => {
    req.body = "";

    rateLimitMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
