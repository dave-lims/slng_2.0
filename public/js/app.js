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
  appendMessage(chatInput.value);
  chatList.scrollTo({
    top: chatList.scrollHeight,
    behavior: "smooth",
  });
  chatList.style.clear = "both";
  chatInput.value = "";
})


/*------ HELPER METHODS -------*/
// Adjusts the chat input box height based on the length of the text inside
function adjustChatHeight() {
  chatInput.style.height = "1.5em"; // Reset height if there is no scroll bar (a.k.a one line of text)
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set height based on scroll height
}

// Appends a message to the chat list
// optional parameter [bot]: default is false, if it's true, add styling for the bot bubble
function appendMessage(text, bot=false) {
  const msgBubble = document.createElement("div");
  msgBubble.innerHTML = text;
  msgBubble.classList.add("chat-list__bubble");

  if (! bot) {
    msgBubble.classList.add("userBubble");
  } else {
    msgBubble.classList.add("botBubble");
  }

  chatList.append(msgBubble);
}