class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");
const g = new Node("g");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

/**
 * 二叉树的深度优先搜索
 * @param {Object} root 根节点
 * @param {any} target 需要搜索的目标节点的值
 */
function depthFirstSearch(root, target) {
  if (!root || root.length === 0) {
    return false;
  }

  if (root.value === target) {
    return true;
  }

  return (
    depthFirstSearch(root.left, target) || depthFirstSearch(root.right, target)
  );
}

// console.log(depthFirstSearch(a, "e"));

/**
 * 二叉树的广度优先搜索
 * @param {Array} rootList 节点数组
 * @param {any} target
 * @returns
 */
function breadthFirstSearch(rootList, target) {
  if (!rootList || rootList.length === 0) {
    return false;
  }

  const childList = [];
  for (let i = 0; i < rootList.length; i++) {
    if (!rootList[i]) {
      return false;
    }
    // 判断节点的值和目标值是否相等
    if (rootList[i].value === target) {
      // 相等则搜索结束返回true
      return true;
    } else {
      // 不相等则将该节点的左右子节点（子树）加入childList数组中，即下一层的所有节点，用于递归遍历
      childList.push(rootList[i].left, rootList[i].right);
    }
  }

  return breadthFirstSearch(childList, target);
}

console.log(breadthFirstSearch([a], "e"));
