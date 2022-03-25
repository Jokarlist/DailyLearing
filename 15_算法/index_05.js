const arr = [1, 2, 3, 4, 5];

/**
 * 递归遍历数组
 * @param {Array} arr
 * @param {Number} i
 * @returns
 */
function recurseArray(arr, i) {
  if (!arr || arr.length <= i) {
    return;
  }

  console.log(arr[i]);
  recurseArray(arr, ++i);
}

// recurseArray(arr, 0);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
const node6 = new Node();

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;

/**
 * 递归遍历单链表
 * @param {Object} rootNode 链表根节点
 */
function recurseLinkedList(rootNode) {
  if (!rootNode) {
    return;
  }

  console.log(rootNode.value);
  recurseLinkedList(rootNode.next);
}

recurseLinkedList(node1);
