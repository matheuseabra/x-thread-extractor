import "dotenv/config";
import express, { NextFunction, type Request, Response } from "express";
import { registerRoutes } from "./routes";
import { log, serveStatic, setupVite } from "./vite";

(async () => {
  const app = express();

  const server = await registerRoutes(app);

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 9000;
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${port}`
      );
    }
  );
})();
