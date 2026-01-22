const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // ← এখানে তোমার OpenAI API Key বসাও

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 400
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";

    res.json({ reply });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ reply: "❌ সার্ভার এ সমস্যা হয়েছে।" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
