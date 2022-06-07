function colorGeneration(targetGeneration) {
  let generation = 0;
  let parents = [document.body];
  let elements;

  while (generation < targetGeneration) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }

  if (elements) {
    color(elements);
  }
}

function color(elements) {
  elements.forEach(({classList}) => {
    classList.add("generation-color");
  });
}

function getAllChildrenOf(parents) {
  return parents.map(({children}) => Array.prototype.slice
                                                    .call(children))
                                                    .reduce((collection, children) => collection.concat(children), []);
}

document.addEventListener('DOMContentLoaded', () => {
  colorGeneration(5);
});

/*
inputs: Number
- positive integer

output: add class to a generation
- undefined if input is less than 1 or greater than 7

Rules:
- positive integer inputs
- if an input is 0 or > 7, return undefined
- add class to a generation
  - a generation: a set of elements that are on the same level of 
  indentation

Examples:
// colorGeneration(1);
elements to be colored: [article#1]

colorGeneration(2);
elements to be colored: [header#2, main#5, footer#23]

colorGeneration(3);
elements to be colored: [span#3, section#6, section#11, p#24]

colorGeneration(4);
elements to be colored: [a#4, p#7, p#12, p#16]

colorGeneration(5);
elements to be colored: [span#8, span#13, span#17, span#20]

colorGeneration(6);
elements to be colored: [strong#9, strong#14, strong#18, strong#21]

colorGeneration(7);
elements to be colored: [a#10, a#15, a#19, a#22]

*/