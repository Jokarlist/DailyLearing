class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

a.children.push(b, c, d);
d.children.push(e, f);

/**
 * 树的深度优先搜索
 * @param {Object} root 根节点
 * @param {any} target 查找的目标
 */
function depthFirstSearch(root, target) {
  if (!root) {
    return false;
  }

  if (root.value === target) {
    return true;
  }

  let result = false;
  for (let i = 0; i < root.children.length; i++) {
    result |= depthFirstSearch(root.children[i], target);
  }

  return result ? true : false;
}

/**
 * 树的广度优先搜索
 * @param {Array} roots 根节点数组
 * @param {any} target 查找的目标
 */
function breadthFirstSearch(roots, target) {
  if (!roots || !roots.length) {
    return false;
  }

  let rootChildren = [];
  for (let i = 0; i < roots.length; i++) {
    if (roots[i].value === target) {
      return true;
    } else {
      rootChildren = rootChildren.concat(roots[i].children);
    }
  }

  return breadthFirstSearch(rootChildren, target);
}

console.log(breadthFirstSearch([a], "g"));
