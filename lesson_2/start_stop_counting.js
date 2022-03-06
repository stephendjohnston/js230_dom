"use strict";

let counterId;

function startCounting() {
  let count = 0;
  counterId = setInterval(() => {
    count += 1;
    console.log(count);
  }, 1000);
}

function stopCounting() {
  clearInterval(counterId)
}

startCounting();
setTimeout(stopCounting, 6000);
// expected output:
// 1
// 2
// 3
// 4
// 5