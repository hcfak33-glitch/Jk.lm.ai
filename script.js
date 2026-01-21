async function sendText() {
    const input = document.getElementById('textInput');
    const responseDiv = document.getElementById('textReply');
    const message = input.value.trim();

    if (!message) return;

    responseDiv.innerText = "এআই চিন্তা করছে...";
    input.value = ""; 

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        responseDiv.innerText = data.reply;

        // আপনার চাওয়া অনুযায়ী এআই উত্তরটি পড়ে শোনাবে (Voice)
        const speech = new SpeechSynthesisUtterance(data.reply);
        speech.lang = 'bn-BD'; 
        window.speechSynthesis.speak(speech);

    } catch (error) {
        responseDiv.innerText = "Error: সংযোগ বিচ্ছিন্ন!";
    }
}
