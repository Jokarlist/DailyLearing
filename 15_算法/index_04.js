const arr = [1, 2, 3, 4, 5];

/**
 * 循环遍历数组
 * @param {Array} arr 
 */
function traversArray(arr) {
  if (!arr) {
    return;
  }

  for (let i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
  }
}

// traversArray(arr);

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
 * 循环遍历单链表
 * @param {Object} rootNode 链表根节点
 */
function traversLinkedList(rootNode) {
  let ptr = rootNode;
  while (true) {
    if (!ptr) {
      return;
    }

    console.log(ptr.value);
    ptr = ptr.next;
  }
}

traversLinkedList(node1);
