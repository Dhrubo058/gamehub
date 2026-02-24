import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // ROM Status API
  app.get("/api/roms/status", (req, res) => {
    const romsDir = path.join(__dirname, "public", "roms", "neogeo");
    const biosPath = path.join(__dirname, "public", "bios", "neogeo.zip");
    
    try {
      const files = fs.readdirSync(romsDir);
      const biosExists = fs.existsSync(biosPath);
      res.json({
        availableRoms: files.filter(f => f.endsWith('.zip')),
        biosReady: biosExists
      });
    } catch (err) {
      res.json({ availableRoms: [], biosReady: false, error: "ROM directory not found" });
    }
  });

  // Serve public folder explicitly for games
  app.use(express.static(path.join(__dirname, "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
