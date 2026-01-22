async function sendMessage() {
    const input = document.getElementById("textInput");
    const chat = document.getElementById("chat");
    const message = input.value.trim();
    if (!message) return;

    // ইউজার বাবল
    const userDiv = document.createElement("div");
    userDiv.className = "msg user";
    userDiv.innerText = message;
    chat.appendChild(userDiv);
    
    // AI বাবল
    const aiDiv = document.createElement("div");
    aiDiv.className = "msg ai";
    aiDiv.innerText = "অপেক্ষা করুন...";
    chat.appendChild(aiDiv);
    
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    try {
        // Render সার্ভারের লাইভ লিঙ্ক ব্যবহার করা হয়েছে
        const res = await fetch("https://jk-lm-ai.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message })
        });

        const data = await res.json();
        aiDiv.innerText = data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";

    } catch (err) {
        console.error(err);
        aiDiv.innerText = "দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।";
    }
    chat.scrollTop = chat.scrollHeight;
}
