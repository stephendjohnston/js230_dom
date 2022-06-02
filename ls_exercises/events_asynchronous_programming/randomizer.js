"use strict";

function randomizer(...callbacks) {
  if (callbacks.length < 1) return;

  let maxSeconds = callbacks.length * 2;

  callbacks.forEach(callback => {
    setTimeout(callback, Math.floor(Math.random() * (1000 * maxSeconds)));
  });

  for (let i = 1; i <= maxSeconds; i++) {
    setTimeout(() => console.log(i), i * 1000);
  }
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function callback4() {
  console.log('callback4');
}

function callback5() {
  console.log('callback5');
}

randomizer(callback1, callback2, callback3);

// Sample Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6

randomizer(callback1, callback2, callback3, callback4);
randomizer(callback1, callback2, callback3, callback4, callback5);
