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
 * 前序遍历
 * @param {Object} root
 */
function preorderTraversal(root) {
  if (!root) {
    return;
  }

  console.log(root.value);
  preorderTraversal(root.left);
  preorderTraversal(root.right);
}

preorderTraversal(a);
// 期望输出：abdecfg
console.log("\n");

/**
 * 中序遍历
 * @param {Object} root
 */
function inorderTraversal(root) {
  if (!root) {
    return;
  }

  inorderTraversal(root.left);
  console.log(root.value);
  inorderTraversal(root.right);
}

inorderTraversal(a);
// 期望输出：dbeafcg
console.log("\n");

/**
 * 后序遍历
 * @param {Object} root
 */
function postorderTraversal(root) {
  if (!root) {
    return;
  }

  postorderTraversal(root.left);
  postorderTraversal(root.right);
  console.log(root.value);
}

postorderTraversal(a);
// 期望输出：debfgca
console.log("\n");
