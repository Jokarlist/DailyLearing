const { isBalance, getDepth } = require("./index_19");
const { leftRotate, rightRotate } = require("./index_20");

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
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
    // 若变化分支是唯一的最深分支，则应先对新根进行左单旋
    const chanedBranchDepth = getDepth(root.left.right);
    const notChangedBranchDepth = getDepth(root.left.left);
    if (chanedBranchDepth > notChangedBranchDepth) {
      root.left = leftRotate(root.left);
    }
    // 再对原节点进行右单旋
    let newRoot = rightRotate(root);
    // 若进行完右单旋之后（之前不一定进行了左单旋），应再对新节点的右子树进行再平衡，以防止新节点在右单旋完之后其右子树还是不平衡
    newRoot.right = change(newRoot.right);
    // 最后经历了上面可能的右右双旋之后新节点的平衡状态可能会发生改变，所以要对其进行一次再平衡
    newRoot = change(newRoot);

    return newRoot;
  } else {
    // 当前节点右子树密左子树疏，需要左单旋
    // 若变化分支是唯一的最深分支，则应先对新根进行右单旋
    const chanedBranchDepth = getDepth(root.right.left);
    const notChangedBranchDepth = getDepth(root.right.right);
    if (chanedBranchDepth > notChangedBranchDepth) {
      root.right = rightRotate(root.right);
    }
    // 再对原节点进行左单旋
    let newRoot = leftRotate(root);
    // 若进行完左单旋之后（之前不一定进行了右单旋），应再对新节点的左子树进行再平衡，以防止新节点在左单旋完之后其左子树还是不平衡
    newRoot.left = change(newRoot.left);
    // 最后经历了上面可能的左左双旋之后新节点的平衡状态可能会发生改变，所以要对其进行一次再平衡
    newRoot = change(newRoot);
    
    return newRoot;
  }
}
