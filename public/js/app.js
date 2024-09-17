const chatInput = document.getElementById('chat-box__input');

chatInput.addEventListener('input', function() {
  chatInput.style.height = '1.5em'; // Reset height if there is no scroll bar (a.k.a one line of text)
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set height based on scroll height
})

// setInterval(() => {
//   const chatBox = document.querySelector('.chat-box');
//   // console.log(chatBox.offsetWidth);
//   // console.log(chatBox.getBoundingClientRect().width);

//   console.log(window.getComputedStyle(chatBox, null).getPropertyValue("width"));
// }, 2000)