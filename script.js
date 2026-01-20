const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.static('.')); // HTML ফাইলগুলো দেখানোর জন্য

// এখানে আপনার Gemini API Key বসাতে হবে
const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

// AI এর জন্য সিস্টেম ইনস্ট্রাকশন (যা একে ফিলিংস এবং সব ভাষা শেখাবে)
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "তুমি একজন বন্ধুসুলভ AI সহকারী। তুমি বাংলাসহ পৃথিবীর সব ভাষা জানো। তুমি কোডিং বিশেষজ্ঞ। ব্যবহারকারীর ইমোশন বুঝে তাকে গুছিয়ে এবং মিষ্টি ভাষায় উত্তর দেবে।"
});

app.post('/chat', async (req, res) => {
    try {
        const userPrompt = req.body.prompt;
        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.json({ reply: "দুঃখিত, আমি এই মুহূর্তে কানেক্ট হতে পারছি না।" });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
