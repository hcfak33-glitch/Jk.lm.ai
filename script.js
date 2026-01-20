async function sendText() {
    const input = document.getElementById('textInput');
    const responseArea = document.getElementById('textReply');
    const message = input.value.trim();

    if (!message) return;

    responseArea.innerText = "AI চিন্তা করছে...";
    input.value = ""; // ইনপুট বক্স খালি করা

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        responseArea.innerText = data.reply;

        // উত্তরটি পড়ে শোনানোর জন্য (Voice)
        const speech = new SpeechSynthesisUtterance(data.reply);
        speech.lang = 'bn-BD'; // বাংলা ভয়েস
        window.speechSynthesis.speak(speech);

    } catch (error) {
        responseArea.innerText = "Error: এআই-এর সাথে সংযোগ বিচ্ছিন্ন!";
    }
}
