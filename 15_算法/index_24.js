class Node {
  constructor(value) {
    this.value = value;
    this.neighbor = [];
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
a.neighbor.push(b, c, d);
b.neighbor.push(a, d);
c.neighbor.push(a, d, e);
d.neighbor.push(a, b, c);
e.neighbor.push(c);

/**
 * 图的深度优先搜索
 * @param {Object} node 节点
 * @param {any} target 查找目标
 * @param {Array} path 查找过程中已经过的路径
 */
function depthFirstSearch(node, target, path = []) {
  if (!node) {
    return false;
  }

  if (path.indexOf(node) > -1) {
    return;
  }

  path.push(node);
  if (node.value === target) {
    return true;
  }

  let result = false;
  for (let i = 0; i < node.neighbor.length; i++) {
    result |= depthFirstSearch(node.neighbor[i], target, path);
  }

  return result ? true : false;
}

/**
 * 图的广度优先搜索
 * @param {Array} nodes 节点数组
 * @param {any} target 查找目标
 * @param {Array} path 查找过程中已经过的路径
 */
function breadthFirstSearch(nodes, target, path = []) {
  if (!nodes || !nodes.length) {
    return false;
  }

  let nodeNeighbors = [];
  for (let i = 0; i < nodes.length; i++) {
    if (path.indexOf(nodes[i]) > -1) {
      continue;
    }

    path.push(nodes[i]);
    if (nodes[i].value === target) {
      return true;
    } else {
      nodeNeighbors = nodeNeighbors.concat(nodes[i].neighbor);
    }
  }

  return breadthFirstSearch(nodeNeighbors, target, path);
}

console.log(breadthFirstSearch([a], "f"));
