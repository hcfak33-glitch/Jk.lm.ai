async function sendText() {
  const input = document.getElementById("textInput");
  const responseDiv = document.getElementById("textReply");
  const message = input.value.trim();
  if (!message) return;

  responseDiv.innerText = "🤖 এআই চিন্তা করছে...";
  input.value = "";

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message })
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    const replyText = data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
    responseDiv.innerText = replyText;

    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(replyText);
      speech.lang = "bn-BD";
      speechSynthesis.speak(speech);
    }

  } catch (err) {
    responseDiv.innerText = "❌ সার্ভারের সাথে সংযোগ হয়নি";
  }
}

/* 🎤 Voice to Text */
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "bn-BD";
recognition.continuous = false;
recognition.interimResults = false;

function startMic() {
  const mic = document.getElementById("micBtn");
  mic.classList.add("listening");
  recognition.start();
}

recognition.onresult = (event) => {
  const voiceText = event.results[0][0].transcript;
  document.getElementById("textInput").value = voiceText;
};

recognition.onend = () => {
  document.getElementById("micBtn").classList.remove("listening");
};

recognition.onerror = () => {
  document.getElementById("textReply").innerText =
    "⚠️ Mic permission দিন অথবা Chrome ব্যবহার করুন";
};
