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
alert("JS loaded");

function sendText() {
  alert("Button clicked");

  const input = document.getElementById("textInput");
  const responseDiv = document.getElementById("textReply");

  if (!input || !responseDiv) {
    alert("HTML ID ভুল");
    return;
  }

  const message = input.value.trim();
  if (!message) return;

  responseDiv.innerText = "🤖 কাজ করছে...";
}
// ---------------- Send text ----------------
async function sendText() {
  const input = document.getElementById("textInput");
  const chat = document.getElementById("textReply");
  const message = input.value.trim();
  if (!message) return;

  // User bubble
  const userDiv = document.createElement("div");
  userDiv.className = "msg user";
  userDiv.innerText = message;
  chat.appendChild(userDiv);
  chat.scrollTop = chat.scrollHeight;

  input.value = "";

  // AI thinking bubble
  const aiDiv = document.createElement("div");
  aiDiv.className = "msg ai";
  aiDiv.innerText = "🤖 এআই চিন্তা করছে...";
  chat.appendChild(aiDiv);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: message })
    });

    const data = await res.json();
    const replyText = data.reply || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";

    aiDiv.innerText = replyText;

    // Voice
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(replyText);
      speech.lang = "bn-BD";
      speechSynthesis.speak(speech);
    }
  } catch (err) {
    console.error(err);
    aiDiv.innerText = "❌ সার্ভারের সাথে সংযোগ হয়নি";
  }

  chat.scrollTop = chat.scrollHeight;
}

// ---------------- Voice to Text ----------------
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
  document.getElementById("micBtn").classList.remove("listening");
};

recognition.onend = () => {
  document.getElementById("micBtn").classList.remove("listening");
};

recognition.onerror = () => {
  document.getElementById("textReply").innerText =
    "⚠️ Mic permission দিন অথবা Chrome ব্যবহার করুন";
};
