"use strict";

function delayLog() {
  for (let i = 1; i <= 10; i += 1) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}

delayLog();
// 1  // 1 second later
// 2  // 2 seconds later
// 3  // 3 seconds later
// 4  // etc...
// 5
// 6
// 7
// 8
// 9
// 10