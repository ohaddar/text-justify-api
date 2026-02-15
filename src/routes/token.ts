import { Router } from "express";
import jwt from "jsonwebtoken";
import { isValidEmail } from "../utils/validation";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Get authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *       400:
 *         description: Bad Request
 */
router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.json({ token });
});

export default router;
