class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");
const f = new Node("F");
const g = new Node("G");
const h = new Node("H");
const i = new Node("I");

a.left = b;
a.right = c;
b.left = d;
// b.right = e;
c.left = f;
c.right = g;
d.right = h;
// e.right = i;

/**
 * 获取二叉树的深度
 * @param {Object} root 根节点
 */
function getDepth(root) {
  if (!root) {
    return 0;
  }

  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * 判断二叉树是否平衡
 * @param {Object} root 根节点
 */
function isBalance(root) {
  if (!root) {
    return true;
  }

  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);
  if (Math.abs(leftDepth - rightDepth) > 1) {
    return false;
  }

  return isBalance(root.left) && isBalance(root.right);
}

// console.log(isBalance(a));

module.exports = {
  getDepth,
  isBalance,
};
