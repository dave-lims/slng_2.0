import readImg from "./js/image-submit.js";

const chatList = document.querySelector(".chat-list");
const chatForm = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-box__input");
const chatSubmitBtn = document.getElementById("chat-box__submit");
const imgSubmit = document.getElementById("chat-box__img");

let welcome = true; // variable used to hide welcome message once the user has input a text

chatInput.focus();  // set cursor to input bar on load

const state = {
  isSubmitting: false,
};

// Function to update button state
function updateButtonState() {
  chatSubmitBtn.disabled = state.isSubmitting || chatInput.value.trim() === "";
}

imgSubmit.addEventListener("input", e => {
  readImg(e.target.files[0]);
})

// Adjust chat height based on input length
chatInput.addEventListener("input", adjustChatHeight);

// Disable submit button if there's no input in the textarea
chatInput.addEventListener("input", updateButtonState);

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
 *    3. Clear the chat input box
 *    4. (*TODO*: Call GPT API and get a response from the server, while we're doing that, we need to disable chat function meanwhile)
 **/
chatForm.addEventListener("submit", e => inputSubmit(e));

async function inputSubmit(e) {
  e.preventDefault(); // prevent default for submit

  if (state.isSubmitting) return; // Prevent duplicate submissions
  state.isSubmitting = true; // Set submitting state
  updateButtonState(); // Update button state

  if (welcome) {  // This runs only once
    document.querySelector(".welcome").style.display = "none";
    // document.querySelector(".welcome").style.opacity = "0"; // initially added for transition, need to fix once OpenAPI is correctly implemented
    welcome = false;
  }
  
  appendMessage(chatInput.value);
  chatInput.value = "";
  state.isSubmitting = false;
  chatSubmitBtn.classList.add('loading');
  
  // API Mock
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await appendMessage('test', true);
  await chatList.scrollTo({
    top: chatList.scrollHeight,
    behavior: "smooth",
  });

  state.isSubmitting = false;
  updateButtonState();
  chatSubmitBtn.classList.remove('loading');
}

/*------ HELPER METHODS -------*/
// Adjusts the chat input box height based on the length of the text inside
function adjustChatHeight() {
  chatInput.style.height = "1.5em"; // Reset height if there is no scroll bar (a.k.a one line of text)
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set height based on scroll height
}

// Appends a message to the chat list
// optional parameter [bot]: default is false, if it's true, add styling for the bot bubble
function appendMessage(text, bot=false) {
  const msgBox = document.createElement("div");
  const msgBubble = document.createElement("div");

  msgBubble.innerHTML = text;
  msgBubble.classList.add("chat-list__bubble");

  if (! bot) {
    msgBox.classList.add("userBubble-box");
    msgBubble.classList.add("userBubble");
  } else {
    msgBox.classList.add("botBubble-box")
    msgBubble.classList.add("botBubble");
  }

  msgBox.append(msgBubble);
  chatList.append(msgBox);
}