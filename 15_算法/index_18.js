class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push(Math.floor(Math.random() * 10000));
}

/**
 * 构建二叉搜索树时新增节点的方法
 * @param {Object} root 根节点
 * @param {Number} value 数据值
 */
function addNode(root, value) {
  if (!root) {
    return null;
  }

  if (root.value === value) {
    return;
  }

  if (root.value > value) {
    if (!root.left) {
      root.left = new Node(value);
    }

    addNode(root.left, value);
  } else {
    if (!root.right) {
      root.right = new Node(value);
    }

    addNode(root.right, value);
  }
}

/**
 * 构建二叉搜索树
 * @param {Array} arr 数据数组
 */
function buildBinarySearchTree(arr) {
  if (!arr || !arr.length) {
    return null;
  }

  const root = new Node(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    addNode(root, arr[i]);
  }

  return root;
}

/**
 * 搜索二叉搜索树
 * @param {Object} root 根节点
 * @param {Number} target 查找值
 */
function searchTree(root, target) {
  if (!root) {
    return false;
  }
  if (root.value === target) {
    return true;
  }

  if (root.value > target) {
    return searchTree(root.left, target);
  } else {
    return searchTree(root.right, target);
  }
}

console.log(searchTree(buildBinarySearchTree(arr), 1000));
