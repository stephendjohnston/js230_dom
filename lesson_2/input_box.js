let cursorInterval;
let isFocused;

document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');

  textField.addEventListener('click', event => {
    event.stopPropagation();
    textField.classList.add('focused');
    isFocused = true;

    if (!cursorInterval) {
      cursorInterval = setInterval(function() {
        textField.classList.toggle('cursor');
      }, 500);
    }
  }, true);
});

document.addEventListener('keydown', event => {
  if (isFocused) {
    let content = document.querySelector('.content');
    let key = event.key;

    if (key === 'Backspace') {
      content.textContent = content.textContent.slice(0, -1);
    } else if (key.length === 1) {
      content.textContent += event.key;
    }
  }
});

document.addEventListener('click', event => {
  clearInterval(cursorInterval);
  cursorInterval = null;
  isFocused = false;

  let textField = document.querySelector('.text-field');
  textField.classList.remove('focused');
  textField.classList.remove('cursor');
});