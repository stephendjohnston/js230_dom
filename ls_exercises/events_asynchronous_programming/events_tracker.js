"use strict";

/*
implement the track function which takes a call back and returns a function that adds the event that occurred
to an object. This returned function should also invoke the call back function that was passed in. 
The object, tracker, will have methods that can show the elements and events that have occurred so far. 

track function:

inputs: callback
outputs: function

the track function will be called as the callback to addEventListener and will be passed a callback function. Since addEventListener
takes a callback function, we need to return a function from track that will then be called as the callback of addEventListener.
The track function needs to add the event that occurred to an object property that has an value array.

rules:
- take a callback function as an argument
- invoke this callback
- return a function to be used as the callback for addEventListener
  - this function will take one argument: event
    - due to being used as the callback for addEventListener
- record event
  - if this event has not previously occurred, it will be added to the tracker object




*/


// document.addEventListener('DOMContentLoaded', () => {
  let divRed = document.querySelector('#red');
  let divBlue = document.querySelector('#blue');
  let divOrange = document.querySelector('#orange');
  let divGreen = document.querySelector('#green');

  divRed.addEventListener('click', track(event => {
    document.body.style.background = 'red';
  }));
  
  divBlue.addEventListener('click', track(event => {
    event.stopPropagation();
    document.body.style.background = 'blue';
  }));
  
  divOrange.addEventListener('click', track(event => {
    document.body.style.background = 'orange';
  }));
  
  divGreen.addEventListener('click', track(event => {
    document.body.style.background = 'green';
  }));
// });

const tracker = (() => {
  const elements = [];
  const events = [];

  function eventHasOccurred(element) {
    return elements.includes(element);
  }

  return {
    list() {
      return events.slice();
    },

    elements() {
      return elements.slice();
    },

    add(event, element) {
      if (!elements.includes(element)) {
        events.push(event);
        elements.push(element);
      }
    },

    clear() {
      events.length = 0;
      elements.length = 0;
    }
  }
})();

function track(callback)  {
  return function(event) {
    event.stopPropagation();
    tracker.add(event, event.target);
    callback(event);
  }
}

// tracker.list().length
// // = 4
// tracker.elements()
// // = [div#blue, div#red, div#orange, div#green]
// tracker.elements()[0] === document.querySelector('#blue')
// // = true
// tracker.elements()[3] === document.querySelector('#green')
// // = true
// tracker.list()[0]
// // = click { target: div#blue, buttons: 0, clientX: 195, clientY: 190, layerX: 195, layerY: 190 }
// // The event listed in `tracker` can differ by browser (Chrome - PointerEvent, Firefox - click)
// tracker.clear()
// // = 0
// tracker.list()
// // = []
// tracker.list()[0] = 'abc'
// tracker.list().length
// = 0