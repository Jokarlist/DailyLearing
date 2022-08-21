/* 用 for-of 迭代所有组件 */
class MyDomElement {
  tag: string;
  children: MyDomElement[];
  constructor(tag: string) {
    this.tag = tag;
  }

  addChildren(component: MyDomElement) {
    this.children.push(component);
  }

  [Symbol.iterator]() {
    const list = [...this.children];
    let node;

    return {
      next: () => {
        while ((node = list.shift())) {
          node.children.length > 0 && list.push(...node.children);

          return { value: node, done: false };
        }

        return { value: null, done: true };
      },
    };
  }
}
