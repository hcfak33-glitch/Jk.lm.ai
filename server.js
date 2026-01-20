import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Static frontend serve
app.use(express.static(__dirname));

// Text Chat API
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  // ডেমো reply (এখানে পরে AI API call দিবো)
  res.json({ reply: "AI বুঝেছে: " + userMessage });
});

// Image API
app.post("/image", (req, res) => {
  const prompt = req.body.prompt;
  const imageUrl = "https://via.placeholder.com/250?text=" + encodeURIComponent(prompt);
  res.json({ url: imageUrl });
});

// Server run
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
