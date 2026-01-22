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

        // 🔴 যদি সার্ভার error দেয়
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const data = await response.json();

        // 🔴 reply না থাকলে fallback
        const replyText = data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
        responseDiv.innerText = replyText;

        // 🔊 আগের ভয়েস বন্ধ করুন
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            // 🔊 ভয়েস আউটপুট
            const speech = new SpeechSynthesisUtterance(replyText);
            speech.lang = 'bn-BD';  // বাংলা (বাংলাদেশ) - যদি সাপোর্ট না থাকে, ডিফল্ট ব্যবহার হবে
            speech.rate = 1;   // স্পিড
            speech.pitch = 1;  // টোন

            // ভয়েস সাপোর্ট চেক
            if (speechSynthesis.getVoices().some(voice => voice.lang.startsWith('bn'))) {
                window.speechSynthesis.speak(speech);
            } else {
                console.warn("বাংলা ভয়েস সাপোর্ট নেই, ডিফল্ট ভয়েস ব্যবহার হচ্ছে।");
                speech.lang = 'en-US';  // ফলব্যাক ইংরেজি
                window.speechSynthesis.speak(speech);
            }
        } else {
            console.warn("এই ব্রাউজারে ভয়েস সিন্থেসিস সাপোর্ট নেই।");
        }

    } catch (error) {
        console.error(error);
        const errorMessage = "❌ Error: সার্ভারের সাথে সংযোগ হয়নি!";
        responseDiv.innerText = errorMessage;

        // এরর মেসেজ ভয়েসে বলুন (যদি সাপোর্ট থাকে)
        if ('speechSynthesis' in window) {
            const errorSpeech = new SpeechSynthesisUtterance(errorMessage);
            errorSpeech.lang = 'bn-BD';
            window.speechSynthesis.speak(errorSpeech);
        }
    }
}
// 🎤 Voice to Text
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "bn-BD";
recognition.continuous = false;
recognition.interimResults = false;

function startMic() {
  recognition.start();
}

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  document.getElementById("textInput").value = voiceText;
};

recognition.onerror = () => {
  document.getElementById("textReply").innerText =
    "⚠️ Mic permission দিন অথবা Chrome ব্যবহার করুন";
};
function startMic() {
  const mic = document.getElementById("micBtn");
  mic.classList.add("listening");
  recognition.start();
}

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  document.getElementById("textInput").value = voiceText;

  document.getElementById("micBtn").classList.remove("listening");
};

recognition.onend = () => {
  document.getElementById("micBtn").classList.remove("listening");
};
