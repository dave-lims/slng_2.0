const chatList = document.querySelector(".chat-list");

const chatForm = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-box__input");

chatInput.addEventListener("input", adjustChatHeight);

chatInput.addEventListener("keypress", e => {
  if (e.key == "Enter" && ! e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event("submit"));
    adjustChatHeight();
  }
})

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  appendMessage(chatInput.value); // TODO: now do something with this
  chatInput.value = "";
})


// HELPER METHODS
function adjustChatHeight() {
  chatInput.style.height = "1.5em"; // Reset height if there is no scroll bar (a.k.a one line of text)
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set height based on scroll height
}

function appendMessage(text) {
  const msgBubble = document.createElement("div");
  msgBubble.classList.add("chat-list__bubble user");
  console.log(msgBubble);
}