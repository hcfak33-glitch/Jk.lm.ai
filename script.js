async function sendText() {
    const input = document.getElementById('textInput');
    const responseDiv = document.getElementById('textReply');
    const message = input.value.trim();

    if (!message) return;

    responseDiv.innerText = "🤖 এআই চিন্তা করছে...";
    input.value = "";

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: message })
        });

        // 🔴 যদি সার্ভার error দেয়
        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        // 🔴 reply না থাকলে fallback
        const replyText = data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
        responseDiv.innerText = replyText;

        // 🔊 আগের ভয়েস বন্ধ করুন
        window.speechSynthesis.cancel();

        // 🔊 ভয়েস আউটপুট
        const speech = new SpeechSynthesisUtterance(replyText);
        speech.lang = 'bn-BD';
        speech.rate = 1;   // স্পিড
        speech.pitch = 1;  // টোন

        window.speechSynthesis.speak(speech);

    } catch (error) {
        console.error(error);
        responseDiv.innerText = "❌ Error: সার্ভারের সাথে সংযোগ হয়নি!";
    }
}
