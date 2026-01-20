const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static('.'));

// এখানে আপনার আসল Gemini API Key বসাতে হবে
const genAI = new GoogleGenerativeAI("YOUR_ACTUAL_API_KEY");

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "তুমি একজন বন্ধুসুলভ AI। তুমি সব ভাষা বোঝো এবং ইমোশন দিয়ে কথা বলো।"
});

app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        res.json({ reply: "সার্ভারে সমস্যা হচ্ছে।" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
