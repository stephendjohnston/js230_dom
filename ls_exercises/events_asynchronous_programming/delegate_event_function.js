"use strict";

/*
Notes on the scenarios:
- Each scenario is independent of the others. (only call one scenario at a time)
- Assume that delegateEvent runs before the described scenario occurs.
*/

document.addEventListener('DOMContentLoaded', () => {
  function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement) {
      return undefined;
    }
  
    parentElement.addEventListener(eventType, e => {
      let validTargets = parentElement.querySelectorAll(selector);
      for (let i = 0; i < validTargets.length; i += 1) {
        if (e.target === validTargets[i]) {
          callback(e);
        }
      }
    });

    return true;
  }
  
  // Possible elements for use with the scenarios
  const element1 = document.querySelector('table');
  const element2 = document.querySelector('main h1');
  const element3 = document.querySelector('main');
  
  // Possible callback for use with the scenarios
  const callback = ({target, currentTarget}) => {
    alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
  };
  
  // Scenario 1:
  delegateEvent(element1, 'p', 'click', callback);
  
  // Scenario 2: 
  delegateEvent(element2, 'p', 'click', callback);

  // Scenario 3: 
  delegateEvent(element2, 'h1', 'click', callback);

  // Scenario 4: 
  delegateEvent(element3, 'h1', 'click', callback);

  // Scenario 5: 
  delegateEvent(element3, 'aside p', 'click', callback);

  // Scenario 6: 
  const newP = document.createElement('P');
  const newContent = document.createTextNode('New Paragraph');
  newP.appendChild(newContent);

  element2.appendChild(newP);

  delegateEvent(element2, 'p', 'click', callback);
});

// Attempt # 2

/*
inputs: parentElement, selector, eventType, callback
outputs: true if function was able to  add event listener
undefined if function was not able to add event listener

Rules:
- assume all event handlers listen during the bubbling phase
- each scenario is independent of the others
- assume delegateEvent runs before the described scenario occurs.
- assume all valid arguments
- if parentElement does not exist, return undefined
- a parentElement may be given a selector that is not a child of the parent element, in this case the event will
not trigger because of the condition that will be given to that parentElement will rely on a child element
to be present for the handler to fire.
- if a

Mental Model:
Add an event listener of eventType to the parent element that listens for any events that fire on the selector element if it
is a child of the parentElement. The handler should invoke the callback upon firing.

Examples:
Scenario 1: delegateEvent(element1, 'p', 'click', callback);
- returns undefined because element1 is a table element and there is no table element in the html

Scenario 2: delegateEvent(element2, 'p', 'click', callback); // true
- returns true because element2 ('main h1') exists in the html
- adds a click event listener to 'h1' element
- but because the h1 element has no child elements, the event will fire
but the callback function will never be invoked.

Scenario 3: delegateEvent(element2, 'h1', 'click', callback); // true
- returns true because element2 exists
- adds click event to element2 or h1
- callback is never invoked because h1 does not have any child descendents of selector (h1)

Scenario 4: delegateEvent(element3, 'h1', 'click', callback); // true
- returns true because element3 (main) exists
- adds click event to element3
- because main has a descendent h1, the callback will be invoked if you click on the h1 element that contains
the text "Header"
- output to console: 'Target: H1\nCurrent Target: MAIN'.
- click anywhere else and the callback does not trigger

Scenario 5: delegateEvent(element3, 'aside p', 'click', callback);
- returns true because element3 exists
- adds click event to element3
- if you click an p element that is a descendent of aside inside main, the callback should trigger
and output 'Target: P\nCurrent Target: MAIN' to the console

delegateEvent(element2, 'p', 'click', callback);
- returns true because element2 exists
- adds click event to element2
- callback function does trigger
** add the following code

const newP = document.createElement('P');
const newContent = document.createTextNode('New Paragraph');
newP.appendChild(newContent);

element2.appendChild(newP);

- If you click the p element that contains the text "New Paragraph", the callback function should trigger and 
display an alert message, e.g., 'Target: P\nCurrent Target: H1'.

How to distinguish if an element is a descendent?
- if event.target.tagName === selector && [selectorElements].some(el => el.contains(event.target))

Algorithm:
- check if parentElement is valid
  - if not, return undefined
- use querySelectorAll to get array of elements of selector
- add event listener to parent element
  - if target element is a child of the parentElement and of the selecotr elements
    - invoke callback

*/

// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement && !(parentElement instanceof Element)) return undefined;

  parentElement.addEventListener(eventType, event => {
    if (targetIsDescendent(parentElement, selector, event.target)) {
      callback(event);
    }
  });

  return true;
}

function targetIsDescendent(parentElement, selector, target) {
  const elements = [...parentElement.querySelectorAll(selector)];

  return elements.some(element => element.contains(target));
}

// Run each of the following scenarios independent of each other:

// Scenario 1
delegateEvent(element1, 'p', 'click', callback); // undefined
// callback not triggered

// Scenario 2
delegateEvent(element2, 'p', 'click', callback); // true
// callback not triggered

// Scenario 3 
delegateEvent(element2, 'h1', 'click', callback); // true
// callback not triggered

// Scenario 4
delegateEvent(element3, 'h1', 'click', callback); // true
// alert message: 'Target: H1\nCurrent Target: MAIN'

// Scenario 5 
delegateEvent(element3, 'aside p', 'click', callback); // true
// alert message: 'Target: P\nCurrent Target: MAIN'

// Scenario 6
delegateEvent(element2, 'p', 'click', callback); // true
// callback does not trigger

// Run this code:
// comment out this code before running previous invocation of delegateEvent for scenario 6 then
// uncomment and try again
const newP = document.createElement('P');
const newContent = document.createTextNode('New Paragraph');
newP.appendChild(newContent);

element2.appendChild(newP);

// callback triggers
// alert message: 'Target: P\nCurrent Target: H1'.