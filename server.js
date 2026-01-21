const express = require('express');
const app = express();
const port = 3000;

// JSON পার্স করার জন্য মিডলওয়্যার
app.use(express.json());

// CORS হ্যান্ডেল করার জন্য (যদি ক্রস-ডোমেইন ইস্যু হয়)
const cors = require('cors');
app.use(cors());

// /chat রুট হ্যান্ডেল
app.post('/chat', (req, res) => {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt);

    // এখানে আপনার AI লজিক যোগ করুন (যেমন Grok API কল)
    // উদাহরণস্বরূপ, সিম্পল রেসপন্স
    const reply = `আপনি বলেছেন: "${prompt}". এটি একটি টেস্ট রেসপন্স!`;

    res.json({ reply });
});

// সার্ভার স্টার্ট
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
