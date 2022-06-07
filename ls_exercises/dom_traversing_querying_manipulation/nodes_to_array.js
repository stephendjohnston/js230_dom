"use strict";
const nodesArr = [];

function nodesToArr() {
  let nodesArr = [];
}

function colorGeneration(targetGeneration) {
  let generation = 0;
  let parents = [document.body];
  let elements;

  while (generation < targetGeneration) {
    generation += 1;
    elements = getAllChildrenOf(parents);
    parents = elements;
  }
}

function getAllChildrenOf(parents) {
  return parents.map(({children}) => Array.prototype.slice
                                                    .call(children))
                                                    .reduce((collection, children) => collection.concat(children), []);
}

let idx = 0;
function walk(node, callback) {
  callback(node, idx);                                                  
  for (let index = 0; index < node.children.length; index += 1) {
    walk(node.children[index], callback);                        
  }
  idx += 1
}

const nodesArr = [];
walk(document.body, node => {
  nodesArr.push([node.nodeName, []]);
});
['BODY', [['HEADER', []], ['MAIN', [['DIV', []], ['DIV', []]]]]]
/*
start with empty array. push in first node name and an array with the
first child of the first node
[]
firstNode = body
[].push('BODY', [])
['BODY', []]
take the children of BODY and iterate over the nodes
- ['HEADER', 'MAIN', 'FOOTER']
for HEADER, push in the node name and array
['BODY', ['HEADER', []]]
iterate over the children of HEADER - no children so go to main
push in MAIN and empty arrray
['BODY', [['HEADER', []], ['MAIN', []]]]
iterate over the children of MAIN
['DIV', 'DIV']
push in nodename and array
['BODY', [['HEADER', []], ['MAIN', [['DIV', []], ['DIV', []]]]]]

*/