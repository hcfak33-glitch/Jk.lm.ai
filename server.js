const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// TEST route
app.get("/", (req, res) => {
  res.send("JK LM AI Server Running ✅");
});

// CHAT route
app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({ reply: "কিছু লিখুন 😊" });
    }

    // এখানে পরে OpenAI / Gemini API বসাতে পারবেন
    const reply = `আপনি লিখেছেন: ${prompt}`;

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
