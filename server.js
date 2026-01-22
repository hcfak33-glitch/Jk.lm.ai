const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// আপনার দেওয়া API Key
const genAI = new GoogleGenerativeAI("AIzaSyBBUvnAfIpAMGxZzW6JxkQMq2Q-aMDsGGg");

app.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "দুঃখিত, সার্ভারে সমস্যা হয়েছে।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
