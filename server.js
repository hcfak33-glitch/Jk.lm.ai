import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Text AI API
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  // ডেমো রিপ্লাই
  // এখানে OpenAI / Gemini API call দিতে পারো
  res.json({ reply: "AI বুঝেছে: " + userMessage });
});

// ✅ Image API (ডেমো)
app.post("/image", async (req, res) => {
  const prompt = req.body.prompt;

  // ডেমো ইমেজ
  const imageUrl = "https://via.placeholder.com/250?text=" + encodeURIComponent(prompt);
  res.json({ url: imageUrl });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
