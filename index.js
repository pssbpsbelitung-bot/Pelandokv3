import { Client } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

// Client WhatsApp
const client = new Client({
  puppeteer: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ]
  }
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("📱 Scan QR ini dari WhatsApp > Linked devices");
});

client.on("ready", () => {
  console.log("✅ Bot siap jalan!");
});

client.on("message", (msg) => {
  if (msg.body.toLowerCase() === "ping") {
    msg.reply("pong 🏓");
  }
});

client.initialize();

// Server kecil biar Render/Cloud jalan
app.get("/", (req, res) => res.send("WA Bot is running 🚀"));
app.listen(port, () => console.log(`HTTP running on :${port}`));
