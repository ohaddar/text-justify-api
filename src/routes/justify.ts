import { Router, Request, Response } from "express";
import { justifyText } from "../utils/justification";
import { authMiddleware } from "../middleware/auth";
import { rateLimitMiddleware } from "../middleware/rateLimit";

const router = Router();

/**
 * @swagger
 * /api/justify:
 *   post:
 *     summary: Justify text
 *     description: Justify text to 80 characters per line. Requires authentication token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         text/plain:
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Justified text
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       402:
 *         description: Payment Required
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/",
  authMiddleware,
  rateLimitMiddleware,
  (req: Request, res: Response) => {
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
  },
);

export default router;
