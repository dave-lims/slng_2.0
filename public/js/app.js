const chatbox = document.querySelector('.chat-box');
const chatInput = document.getElementById('chat-box__input');

chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto'; // Reset height
  chatInput.style.height = `${chatInput.scrollHeight}px`; // Set height based on scroll height
  console.log('yay');
})