const sendBtn = document.querySelector('button'); // আপনার সেন্ড বাটন
const chatInput = document.querySelector('textarea'); // ইনপুট বক্স
const resultDiv = document.querySelector('.text-chat-response'); // যেখানে উত্তর দেখাবে

sendBtn.addEventListener('click', async () => {
    const message = chatInput.value;
    if (!message) return;

    resultDiv.innerText = "AI চিন্তা করছে...";

    // সার্ভারের কাছে মেসেজ পাঠানো
    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message })
    });

    const data = await response.json();
    resultDiv.innerText = data.reply; // এআই-এর উত্তর দেখানো
});
