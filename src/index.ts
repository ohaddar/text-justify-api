import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import tokenRouter from "./routes/token";
import justifyRouter from "./routes/justify";

const serverUrl =
  process.env.RENDER_URL || `http://localhost:${process.env.PORT || 3000}`;

const app = express();

app.use(express.json());
app.use(express.text());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Text Justification API",
      version: "1.0.0",
      description: "API for text justification",
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Welcome to Test API</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Welcome to Test API</h1>
        <p>Explore the <a href="/api-docs">API Documentation</a></p>
      </body>
    </html>
  `);
});

app.use("/api/token", tokenRouter);
app.use("/api/justify", justifyRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
