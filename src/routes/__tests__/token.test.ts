import request from "supertest";
import express from "express";
import tokenRouter from "../token";

const app = express();
app.use(express.json());
app.use("/api/token", tokenRouter);

describe("POST /api/token", () => {
  it("should generate token with valid email", async () => {
    const response = await request(app)
      .post("/api/token")
      .send({ email: "test@example.com" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  it("should reject without email", async () => {
    const response = await request(app).post("/api/token").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Email is required");
  });

  it("should reject invalid email", async () => {
    const response = await request(app)
      .post("/api/token")
      .send({ email: "invalid-email" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid email format");
  });
});
