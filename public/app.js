import { HELLO } from "./js/api.js";

const chatList = document.querySelector(".chat-list");
const chatForm = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-box__input");
const chatSubmitBtn = document.getElementById("chat-box__submit");

chatInput.addEventListener("input", adjustChatHeight);

// Disable submit button if there's no input in the textarea
chatInput.addEventListener("input", e => {
  if (chatInput.value) {
    chatSubmitBtn.disabled = false;
  } else {
    chatSubmitBtn.disabled = true;
  }
})

// When the user presses the Enter key, it submits the text
chatInput.addEventListener("keypress", e => {
  if (e.key == "Enter" && ! e.shiftKey) {
    e.preventDefault(); // prevent default for pressing enter
    if (chatInput.value) {
      chatForm.dispatchEvent(new Event("submit"));
      adjustChatHeight();
    }
  }
})

/** On chat input submit:
 *    1. Make a new text bubble and append it to the chat
 *    2. Scroll back to the latest text
 *        (*TODO*: need to fix it in the future b/c the bot text will be at the bottom, not the user text)
 *    3. Clear the chat input box
 *    4. (*TODO*: Call GPT API and get a response from the server, while we're doing that, we need to disable chat function meanwhile)
 **/
chatForm.addEventListener("submit", e => {
  e.preventDefault(); // prevent default for submit
  appendMessage(chatInput.value);
  chatList.scrollTo({
    top: chatList.scrollHeight,
    behavior: "smooth",
  });
  chatList.style.clear = "both";
  chatInput.value = "";
  chatSubmitBtn.disabled = true;
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

console.log(HELLO);