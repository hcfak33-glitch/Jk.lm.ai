const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static('.'));

// এই লাইনে শুধু আপনার API Key টি বসান (কোটেশনের ভেতরে)
const genAI = new GoogleGenerativeAI("YOUR_ACTUAL_KEY_HERE");

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "তুমি একজন বন্ধুসুলভ AI। তুমি সব ভাষা বোঝো, কোডিং পারো এবং ইমোশন দিয়ে গুছিয়ে কথা বলো।"
});

app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        res.status(500).json({ reply: "সার্ভারে সমস্যা হচ্ছে।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running!'));
