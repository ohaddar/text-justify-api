import "dotenv/config";
import express, { Request, Response } from "express";
import tokenRouter from "./routes/token";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Test API",
  });
});

app.use("/api/token", tokenRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
