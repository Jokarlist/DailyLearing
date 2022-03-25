// 封装栈
class Stack {
  constructor() {
    this.value = [];
  }

  push(value) {
    this.value.push(value);
    
    return this.value.length;
  }

  pop() {
    return this.value.pop();
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.value);
stack.pop();
console.log(stack.value);

// 封装队列
class Queue {
  constructor() {
    this.value = [];
  }

  push(value) {
    this.value.push(value);

    return this.value.length;
  }

  pop() {
    return this.value.shift();
  }
}

const queue = new Queue();
queue.push(1);
queue.push(2);
queue.push(3);
console.log(queue.value);
queue.pop();
console.log(queue.value);