async function sendText() {
  const text = document.getElementById("textInput").value;

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  document.getElementById("textReply").innerText = data.reply;
}

async function generateImage() {
  const prompt = document.getElementById("imageInput").value;

  const res = await fetch("http://localhost:3000/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  const imageBox = document.getElementById("imageResult");
  imageBox.innerHTML = `<img src="${data.url}" width="250" />`;
}
