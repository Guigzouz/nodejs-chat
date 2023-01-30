let ws;
function connect() {
  ws = new WebSocket("ws://localhost:3000/ws-posts");

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === "reply") addMessage(data.msg);
  };
}

async function addMessage(content) {
  const message = document.createElement("li");
  message.innerText = content;
  postsList.prepend(message);
}

connect();

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // await sendFile();
  const inputText = document.querySelector("#post-area");
  const myFiles = document.getElementById("my-files").files;
  addMessage(inputText.value);
  uploadFile(myFiles, ws);

  // ws.send(JSON.stringify(myFiles));
  // ws.send(inputText.value);
  inputText.value = "";
});