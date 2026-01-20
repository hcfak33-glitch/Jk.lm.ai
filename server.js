import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// এখানে AI-র API বসবে
app.post("/chat", async (req, res) => {
  const userText = req.body.message;

  // এখন শুধু ডেমো রিপ্লাই
  // পরে Gemini / OpenAI বসানো হবে
  res.json({
    reply: "আমি বুঝেছি: " + userText
  });
});

app.listen(3000, () => {
  console.log("AI Server running on http://localhost:3000");
});
