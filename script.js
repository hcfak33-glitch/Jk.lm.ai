async function sendMessage() {
    const input = document.getElementById("textInput");
    const chat = document.getElementById("chat");
    const message = input.value.trim();
    if (!message) return;

    // ইউজার মেসেজ দেখানো
    const userDiv = document.createElement("div");
    userDiv.className = "msg user";
    userDiv.innerText = message;
    chat.appendChild(userDiv);

    // AI মেসেজ বক্স তৈরি
    const aiDiv = document.createElement("div");
    aiDiv.className = "msg ai";
    aiDiv.innerText = "অপেক্ষা করুন...";
    chat.appendChild(aiDiv);

    try {
        // Render সার্ভারে রিকোয়েস্ট পাঠানো
        const res = await fetch("https://jk-lm-ai.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message })
        });

        const data = await res.json();
        aiDiv.innerText = data.reply; // AI এর উত্তর এখানে আসবে

    } catch (err) {
        aiDiv.innerText = "দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";
    }
}
