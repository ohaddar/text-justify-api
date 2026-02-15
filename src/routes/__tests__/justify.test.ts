import request from "supertest";
import express from "express";
import jwt from "jsonwebtoken";
import justifyRouter from "../justify";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret";

const app = express();
app.use(express.text({ type: "*/*" }));
app.use("/api/justify", justifyRouter);

describe("POST /api/justify", () => {
  let token: string;

  beforeEach(() => {
    token = jwt.sign({ email: "test@example.com" }, JWT_SECRET);
  });

  it("should return 401 without token", async () => {
    const response = await request(app).post("/api/justify").send("test text");

    expect(response.status).toBe(401);
  });

  it("should return 400 for empty text", async () => {
    const response = await request(app)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send("");

    expect(response.status).toBe(400);
  });

  it("should justify text with valid token", async () => {
    const response = await request(app)
      .post("/api/justify")
      .set("Authorization", `Bearer ${token}`)
      .send("hello world test");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/plain");
    expect(typeof response.text).toBe("string");
  });
});
