const sendBtn = document.querySelector('.send-button'); // আপনার CSS ক্লাস অনুযায়ী
const chatInput = document.querySelector('textarea');
const resultDiv = document.querySelector('.response-area'); // যেখানে উত্তর দেখাবে

sendBtn.addEventListener('click', async () => {
    const message = chatInput.value;
    if (!message) return;

    resultDiv.innerText = "চিন্তা করছি...";

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        resultDiv.innerText = data.reply;
        
        // উত্তরটি পড়ে শোনানোর জন্য (Text to Speech)
        const speech = new SpeechSynthesisUtterance(data.reply);
        window.speechSynthesis.speak(speech);

    } catch (error) {
        resultDiv.innerText = "Error: সার্ভার কানেক্ট হচ্ছে না।";
    }
});
