const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// আপনার দেওয়া Gemini API Key ব্যবহার করা হয়েছে
const genAI = new GoogleGenerativeAI("AIzaSyBBUvnAfIpAMGxZzW6JxkQMq2Q-aMDsGGg");

app.post('/chat', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // Gemini-1.5-flash মডেল ব্যবহার করা হচ্ছে যা দ্রুত এবং ফ্রি
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // সফলভাবে উত্তর পাঠানো হচ্ছে
        res.json({ reply: text });
        
    } catch (error) {
        console.error("Error with Gemini API:", error);
        // কোনো সমস্যা হলে রিপ্লাই পাঠানো
        res.status(500).json({ reply: "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।" });
    }
});

// Render-এর জন্য Port সেটআপ
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`সার্ভার চলছে পোর্টে: ${PORT}`);
});
