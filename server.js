const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/chat", (req, res) => {
  const { prompt } = req.body;
  console.log("Received prompt:", prompt);
  const reply = `আপনি বলেছেন: "${prompt}". এটি একটি টেস্ট রেসপন্স!`;
  res.json({ reply });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
