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
const c2 = new Node("c-updated");
const d2 = new Node("d");
const e2 = new Node("e");
const f2 = new Node("f");
const g2 = new Node("g");

a2.left = b2;
a2.right = c2;
b2.left = d2;
// b2.right = e2;
c2.left = f2;
c2.right = g2;
f2.left = e2;

/**
 * 二叉树的diff算法
 * @param {Object} root1 原二叉树的根节点
 * @param {Object} root2 新二叉树的根节点
 * @param {Array} diffNodes 变化节点的数组
 */
function diffBinaryTree(root1, root2, diffNodes = []) {
  if (root1 === root2) {
    return diffNodes;
  }

  if (!root1 && root2) {
    // root1之前不存在而现在有，则表示新增节点
    diffNodes.push({ type: "create", origin: null, current: root2 });
  } else if (root1 && !root2) {
    // root1之前存在而现在无，则表示删除节点
    diffNodes.push({ type: "delete", origin: root1, current: null });
  } else if (root1.value !== root2.value) {
    // root1之前的值和现在的值不一样，则表示更新了节点的值
    diffNodes.push({ type: "update", origin: root1, current: root2 });
    // 只是修改了节点的值，其子树还需要继续比较
    diffBinaryTree(root1.left, root2.left, diffNodes);
    diffBinaryTree(root1.right, root2.right, diffNodes);
  } else {
    // 上述情况都不属于则继续对节点的子树进行比较
    diffBinaryTree(root1.left, root2.left, diffNodes);
    diffBinaryTree(root1.right, root2.right, diffNodes);
  }

  return diffNodes;
}

console.log(diffBinaryTree(a1, a2));
