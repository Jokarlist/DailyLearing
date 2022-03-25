const { isBalance, getDepth } = require("./index_19.js");

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
d.left = e;

/**
 * 二叉树的左单旋
 * @param {Object} root 根节点
 */
function leftRotate(root) {
  // 找到新根
  const newRoot = root.right;
  // 找到变化分支
  const changedBranch = root.right.left;
  // 令当前旋转节点的右孩子为变化分支
  root.right = changedBranch;
  // 令新根的左孩子为旋转节点
  newRoot.left = root;
  // 返回新的根节点
  return newRoot;
}

/**
 * 二叉树的右单旋
 * @param {Object} root 根节点
 */
function rightRotate(root) {
  // 找到新根
  const newRoot = root.left;
  // 找到变化分支
  const changedBranch = root.left.right;
  // 令当前旋转节点的左孩子为变化分支
  root.left = changedBranch;
  // 令新根的右孩子为旋转节点
  newRoot.right = root;
  // 返回新的根节点
  return newRoot;
}

/**
 * 将不平衡的二叉树变平衡，并返回新树的根节点
 * @param {Object} root 根节点
 */
function change(root) {
  // 检查根节点是否失衡
  if (isBalance(root)) {
    return root;
  }
  // 根节点失衡，对二叉树进行平衡操作要按照后序遍历的顺序进行操作，从下往上判断，需要递归
  // 根节点的左子树存在，则对其递归变平衡
  if (root.left) {
    root.left = change(root.left);
    
  }
  // 根节点的右子树存在，则对其递归变平衡
  if (root.right) {
    root.right = change(root.right);
  }
  // 对根节点的变平衡
  // 获取根节点左右子树的深度
  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);
  if (Math.abs(leftDepth - rightDepth) <= 1) {
    // 当前节点未失衡
    return root;
  } else if (leftDepth > rightDepth) {
    // 当前节点左子树密右子树疏，需要右单旋
    return rightRotate(root);
  } else {
    // 当前节点右子树密左子树疏，需要左单旋
    return leftRotate(root);
  }
}

// console.log(isBalance(a));
// const newRoot = change(a);
// console.log(isBalance(newRoot));

module.exports = {
  leftRotate,
  rightRotate
}