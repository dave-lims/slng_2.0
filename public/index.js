import readImg from "./js/image-submit.js";
const images = {
  cat1: import('./img/cats/1.jpg'),
  cat2: import('./img/cats/2.jpg'),
  cat3: import('./img/cats/3.jpg'),
  cat4: import('./img/cats/4.jpg'),
  cat5: import('./img/cats/5.jpg'),
  cat6: import('./img/cats/6.jpg'),
  cat7: import('./img/cats/7.jpg'),
};
let lastCat = 0;
const catText = ['Aren\'t our cats so cute', 'These are not my cats', 'Another one!', 'You want another?', 'Here are more cats!', 'Cat cat cat', 'You really do like cats huh', 'If you see the same cat again, we\'re working on expanding our cat database', 'Meow'];

const chatList = document.querySelector(".chat-list");
const chatForm = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-box__input");
const chatSubmitBtn = document.getElementById("chat-box__submit");
const imgSubmit = document.getElementById("chat-box__img");

const state = {
  welcome: true,
  firstText: true,
  isSubmitting: false,
};

chatInput.focus();  // set cursor to input bar on load

// hamburger sidebar logic for mobile/smaller screens
const hamburger = document.querySelector(".top-sidebar__hamburger");
const xmark = document.querySelector(".sidebar__xmark");
const sidebar = document.querySelector(".sidebar");
const backdrop = document.querySelector('.backdrop');
hamburger.addEventListener("click", e => {
  console.log('test button');
  sidebar.classList.toggle('active');
})
xmark.addEventListener("click", e => {
  sidebar.classList.remove('active');
})
backdrop.addEventListener("click", e => {
  sidebar.classList.remove('active');
})

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

  if (state.welcome) {  // This runs only once
    document.querySelector(".welcome").style.display = "none";
    // document.querySelector(".welcome").style.opacity = "0"; // initially added for transition, need to fix once OpenAPI is correctly implemented
    state.welcome = false;
  }
  
  appendMessage(chatInput.value);
  chatList.scrollTo({
    top: chatList.scrollHeight,
    behavior: "smooth",
  });
  chatInput.value = "";
  state.isSubmitting = true;
  chatSubmitBtn.classList.add('loading');
  
  // API Mock
  await new Promise((resolve) => setTimeout(resolve, 750));
  
  if (state.firstText) {
    appendMessage('Hi there! 👋  Thank you for using SLNG 💬\n\nSLNG is currently undergoing significant updates to improve its overall performance and user experience. As part of this process, many features and sections of the site are being revamped.\n\n📱 You may notice limited functionality or access during this time, but rest assured, these updates are aimed at delivering a better and more seamless platform.\n\nThank you for your patience and understanding as we work to complete these improvements. 🙇🏻‍♂️', true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    appendMessage('For now, please enjoy these cat pictures 🐱', true);
    state.firstText = false;
  } else {
    await new Promise(resolve => setTimeout(resolve, 500));
    await appendMessage(catText[Math.floor(Math.random() * catText.length)], true);
    chatList.scrollTo({
      top: chatList.scrollHeight,
      behavior: "smooth",
    });
  }

  await new Promise(resolve => setTimeout(resolve, 500));
  await appendImg(getRandomCatPic());

  await new Promise(requestAnimationFrame);

  await new Promise(resolve => setTimeout(resolve, 200));
  chatList.scrollTo({
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
// optional parameter [img]: default is null, accepts <img> element (src & alt should be provided)
function appendMessage(text, bot=false, img=null) {
  const msgBox = document.createElement("div");
  const msgBubble = document.createElement("div");

  msgBubble.classList.add("chat-list__bubble");
  msgBubble.innerHTML = text;

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

async function appendImg(img) {
  if (img) {
    const catBox = document.createElement("div");
    catBox.classList.add("botBubble-box")
    catBox.appendChild(img);
    chatList.appendChild(catBox);
  } else {
    throw new Error("not an iamge!");
  }
}

function getRandomCatPic() {
  const cat = document.createElement('img');
  cat.alt = 'image of a cute cat';

  let currCat = Math.floor(Math.random() * 7) + 1;
  while (lastCat == currCat) {
    currCat = Math.floor(Math.random() * 7) + 1;
  }
  lastCat = currCat;
  
  cat.src = `./img/${currCat}.jpg`;

  return cat;
}