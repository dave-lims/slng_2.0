export default function attachHoverMessage(target, message) {

  const hoverTargets = document.querySelectorAll(target);
  const hoverMessage = document.querySelector(message);

  for (target of hoverTargets) {
    target.addEventListener('mousemove', (e) => {
      console.log('HOVER');
      hoverMessage.style.visibility = 'visible';
      hoverMessage.style.opacity = 1;
      hoverMessage.style.left = `${e.pageX + 20}px`;
      hoverMessage.style.top = `${e.pageY - 35}px`;
    });

    target.addEventListener('mouseleave', () => {
      console.log('LEAVE');
      hoverMessage.style.visibility = 'hidden';
      hoverMessage.style.opacity = '0';
    });
  }
}