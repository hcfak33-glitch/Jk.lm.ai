const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static('.'));

// আপনার এপিআই কি এখানে বসান
const genAI = new GoogleGenerativeAI("এখানে_আপনার_পুরো_API_KEY_বসান");

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "তুমি একজন বন্ধুসুলভ AI সহকারী। তুমি বাংলাসহ সব ভাষা জানো। তুমি কোডিং বিশেষজ্ঞ এবং মানুষের অনুভূতি বুঝে খুব গুছিয়ে মিষ্টি ভাষায় কথা বলো।"
});

app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.json({ reply: "সার্ভারে সমস্যা হচ্ছে, একটু পরে চেষ্টা করো।" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
