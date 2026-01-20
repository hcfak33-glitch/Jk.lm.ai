async function sendText() {
    const input = document.getElementById('textInput');
    const responseDiv = document.getElementById('textReply');
    const message = input.value.trim();

    if (!message) return;

    responseDiv.innerText = "চিন্তা করছি...";

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });

        const data = await response.json();
        responseDiv.innerText = data.reply;

        // কথা বলার ফিচার (Voice)
        const utterance = new SpeechSynthesisUtterance(data.reply);
        utterance.lang = 'bn-BD'; 
        window.speechSynthesis.speak(utterance);

    } catch (error) {
        responseDiv.innerText = "Error: এআই-এর সাথে সংযোগ বিচ্ছিন্ন!";
    }
}
