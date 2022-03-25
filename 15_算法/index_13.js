class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const preorder = ["a", "b", "d", "e", "c", "f", "g"];
const inorder = ["d", "b", "e", "a", "f", "c", "g"];
const postorder = ["d", "e", "b", "f", "g", "c", "a"];

/**
 * 根据二叉树的前序遍历和中序遍历重建二叉树，返回根节点
 * @param {Array} preorder 前序遍历二叉树数组
 * @param {Array} inorder 中序遍历二叉树数组
 */
function preInRebuild(preorder, inorder) {
  if (
    !preorder ||
    !inorder ||
    preorder.length === 0 ||
    inorder.length === 0 ||
    preorder.length !== inorder.length
  ) {
    return null;
  }

  const root = new Node(preorder[0]);
  const rootIndex = inorder.indexOf(root.value);
  const preorderLeft = preorder.slice(1, rootIndex + 1);
  const preorderRight = preorder.slice(rootIndex + 1, preorder.length);
  const inorderLeft = inorder.slice(0, rootIndex);
  const inorderRight = inorder.slice(rootIndex + 1, inorder.length);
  root.left = preInRebuild(preorderLeft, inorderLeft);
  root.right = preInRebuild(preorderRight, inorderRight);

  return root;
}

// console.log(preInRebuild(preorder, inorder));

/**
 * 根据二叉树的后序遍历和中序遍历重建二叉树，返回根节点
 * @param {Array} postorder 后序遍历二叉树数组
 * @param {Array} inorder 中序遍历二叉树数组
 */
function postInRebuild(postorder, inorder) {
  if (
    !postorder ||
    !inorder ||
    postorder.length === 0 ||
    inorder.length === 0 ||
    postorder.length !== inorder.length
  ) {
    return null;
  }

  const root = new Node(postorder[postorder.length - 1]);
  const rootIndex = inorder.indexOf(root.value);
  const postorderLeft = postorder.slice(0, rootIndex);
  const postorderRight = postorder.slice(rootIndex, postorder.length - 1);
  const inorderLeft = inorder.slice(0, rootIndex);
  const inorderRight = inorder.slice(rootIndex + 1, inorder.length);
  root.left = postInRebuild(postorderLeft, inorderLeft);
  root.right = postInRebuild(postorderRight, inorderRight);

  return root;
}

console.log(postInRebuild(postorder, inorder));
