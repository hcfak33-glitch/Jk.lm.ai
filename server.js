const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static('.'));

// এখানে আপনার নতুন এপিআই কি-টি বসান
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "তুমি একজন বন্ধুসুলভ AI। তুমি সব ভাষা জানো, কোডিং বিশেষজ্ঞ এবং মানুষের অনুভূতি বুঝে মিষ্টি করে উত্তর দাও।"
});

app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "সার্ভারে সমস্যা হচ্ছে, একটু পরে চেষ্টা করুন।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
