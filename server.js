// আপনার এআই লজিক এখানে থাকবে
const systemInstruction = "তুমি একজন বন্ধুসুলভ AI। তুমি সব ভাষা জানো, কোডিং পারো এবং মানুষের আবেগ বুঝে গুছিয়ে কথা বলো।";

app.post('/chat', async (req, res) => {
    const userPrompt = req.body.prompt;
    
    // এখানে AI API কল হবে (যেমন Gemini API)
    // উত্তর আসার পর সেটা ফ্রন্ট-এন্ডে পাঠানো হবে
    res.json({ reply: "আপনার উত্তরের কোড এখানে জেনারেট হবে..." });
});
