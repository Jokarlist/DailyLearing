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

function reverseLinkedList(rootNode) {
  // 递归获取到倒数第二个节点
  if (rootNode.next.next === null) {
    // 将倒数第一个节点指向倒数第二个节点
    rootNode.next.next = rootNode;
    // 返回倒数第一个节点
    return rootNode.next;
    // 未获取到倒数第二个节点时的处理
  } else {
    // 递归寻找，接收返回值作为逆置链表之后的每一个真根节点或自认为根节点（下简称为根节点）
    let reversedRootNode = reverseLinkedList(rootNode.next);
    // 将每一个根节点的下一个节点指向根节点
    rootNode.next.next = rootNode;
    // 根节点指向空
    rootNode.next = null;
    // 返回根节点
    return reversedRootNode;
  }
}

const reversedRootNode = reverseLinkedList(node1);

function traversLinkedList(rootNode) {
  if (!rootNode) {
    return;
  }

  console.log(rootNode.value);
  traversLinkedList(rootNode.next);
}

traversLinkedList(reversedRootNode);
