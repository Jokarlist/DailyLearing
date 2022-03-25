const { isBalance, getDepth } = require("./index_19");
const { leftRotate, rightRotate } = require("./index_20");

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
    // 若变化分支是唯一的最深分支，则应先对新根进行左单旋
    const chanedBranchDepth = getDepth(root.left.right);
    const notChangedBranchDepth = getDepth(root.left.left);
    if (chanedBranchDepth > notChangedBranchDepth) {
      root.left = leftRotate(root.left);
    }
    // 再对原节点进行右单旋
    return rightRotate(root);
  } else {
    // 当前节点右子树密左子树疏，需要左单旋
    // 若变化分支是唯一的最深分支，则应先对新根进行右单旋
    const chanedBranchDepth = getDepth(root.right.left);
    const notChangedBranchDepth = getDepth(root.right.right);
    if (chanedBranchDepth > notChangedBranchDepth) {
      root.right = rightRotate(root.right);
    }
    // 再对原节点进行左单旋
    return leftRotate(root);
  }
}

console.log(isBalance(a));
console.log(isBalance(change(a)));
