"use strict";

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  callback(element);
}

let sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
  elem.classList.add('highlight');
});

sectionElement.classList.contains('highlight');
// = true
sectionElement.style.fontWeight;
// = "bold"

// LS solution

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(element);
  }
}

// Further Exploration

const bolded = new CustomEvent('bold');

function makeBold(element, event) {
  element.dispatchEvent(event);
}

let sectionElement = document.querySelector('section');
sectionElement.addEventListener('bold', event => {
  event.currentTarget.style.fontWeight = 'bold';
});

// LS further exploration solution

const sectionElement = document.querySelector('section');

function makeBold(element) {
  element.style.fontWeight = 'bold';
  const event = new CustomEvent('bolded');

  element.dispatchEvent(event);
}

sectionElement.addEventListener('bolded', (event) => {
  alert(event.target.tagName);
  event.target.classList.add('highlight');
});

makeBold(sectionElement);