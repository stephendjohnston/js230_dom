function nodeSwap(nodeId1, nodeId2) {
  const node1 = document.getElementById(nodeId1);
  const node2 = document.getElementById(nodeId2);

  if (invalidSwap(node1, node2)) return undefined;

  let temp = document.createElement('div');
  node1.parentNode.insertBefore(temp, node1);

  node2.parentNode.insertBefore(node1, node2);
  temp.parentNode.insertBefore(node2, temp);

  temp.parentNode.removeChild(temp);
  
  return true;
}

function invalidSwap(node1, node2) {
  return !node1 || !node2 || node1.contains(node2) || node2.contains(node1)
}

document.addEventListener('DOMContentLoaded', () => {
  // id attribute doesn't exist
  nodeSwap(1, 20); // undefined
  // at least one of the nodes is a "child" of the other
  nodeSwap(1, 4); // undefined
  nodeSwap(3, 9); // undefined
  // valid
  nodeSwap(1, 2); // true
  nodeSwap(3, 1); // true
  nodeSwap(7, 9); // true
  nodeSwap(2, 6); // true
});