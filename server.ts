import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

console.log("SERVER.TS LOADING...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log("Starting server...");
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    console.log("Health check requested");
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ROM Status API
  app.get("/api/roms/status", (req, res) => {
    console.log("ROM status requested");
    const romsDir = path.join(__dirname, "public", "roms", "neogeo");
    const biosPath = path.join(__dirname, "public", "bios", "neogeo.zip");
    
    try {
      if (!fs.existsSync(romsDir)) {
        return res.json({ availableRoms: [], biosReady: false, note: "ROM directory created" });
      }
      const files = fs.readdirSync(romsDir);
      const biosExists = fs.existsSync(biosPath);
      res.json({
        availableRoms: files.filter(f => f.endsWith('.zip')),
        biosReady: biosExists
      });
    } catch (err) {
      console.error("Error reading ROMs:", err);
      res.json({ availableRoms: [], biosReady: false, error: "Internal server error" });
    }
  });

  // Serve public folder explicitly for games
  app.use(express.static(path.join(__dirname, "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    console.log("Initializing Vite in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback to index.html for SPA
    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      console.log(`SPA Fallback for: ${url}`);
      try {
        const indexPath = path.resolve(__dirname, "index.html");
        if (!fs.existsSync(indexPath)) {
          console.error("index.html NOT FOUND at", indexPath);
          return res.status(404).send("index.html not found");
        }
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        console.error("Vite Transform Error:", e);
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    console.log("Running in production mode...");
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
