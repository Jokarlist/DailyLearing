class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const a1 = new Node("a");
const b1 = new Node("b");
const c1 = new Node("c");
const d1 = new Node("d");
const e1 = new Node("e");
const f1 = new Node("f");
const g1 = new Node("g");

a1.left = b1;
a1.right = c1;
b1.left = d1;
b1.right = e1;
c1.left = f1;
c1.right = g1;

const a2 = new Node("a");
const b2 = new Node("b");
const c2 = new Node("c");
const d2 = new Node("d");
const e2 = new Node("e");
const f2 = new Node("f");
const g2 = new Node("g");

a2.left = b2;
a2.right = c2;
b2.left = d2;
b2.right = e2;
c2.left = f2;
c2.right = g2;

/**
 * 二叉树的比较，基于二叉树的左右子树互换后不是同一棵二叉树的前提
 * @param {Object} root1
 * @param {Object} root2
 */
function compareBinaryTree(root1, root2) {
  // 两个节点都为null或undefined或相等（表示为同一棵树）
  if (root1 === root2) {
    return true;
  }
  // 两个节点其中之一为null或undefined
  if ((!root1 && root2) || (root1 && !root2)) {
    return false;
  }
  // 对应的两个节点的值不相等
  if (root1.value != root2.value) {
    return false;
  }
  // 对节点的左（右）子树上的节点进行递归比较
  return compareBinaryTree(root1.left, root2.left) && compareBinaryTree(root1.right, root2.right);
}

// console.log(compareBinaryTree(a1, a2));

/**
 * 二叉树的比较，基于二叉树的左右子树互换后还是同一棵二叉树的前提
 * @param {Object} root1
 * @param {Object} root2
 */
function compareBinaryTree(root1, root2) {
  // 两个节点都为null或undefined或相等（表示为同一棵树）
  if (root1 === root2) {
    return true;
  }
  // 两个节点其中之一为null或undefined
  if ((!root1 && root2) || (root1 && !root2)) {
    return false;
  }
  // 对应的两个节点的值不相等
  if (root1.value != root2.value) {
    return false;
  }
  // 对节点的左（右）子树上的节点进行递归比较
  return (
    (compareBinaryTree(root1.left, root2.left) && compareBinaryTree(root1.right, root2.right)) ||
    (compareBinaryTree(root1.left, root2.right) && compareBinaryTree(root1.right, root2.left))
  );
}
