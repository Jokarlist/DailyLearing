const isEqual = Symbol();
const getObj = Symbol();

class MyMap {
  constructor(iterable = []) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new TypeError(`传入的${iterable}参数不是一个可迭代对象`);
    }

    this._datas = [];

    for (const item of iterable) {
      if (typeof item[Symbol.iterator] !== "function") {
        throw new TypeError(`iterable中的${item}元素不是一个可迭代对象`);
      } else {
        const iterator = item[Symbol.iterator]();
        const key = iterator.next().value;
        const value = iterator.next().value;

        this.set(key, value);
      }
    }
  }

  set(key, value) {
    if (this.has(key)) {
      // 修改已有对象
      this[getObj](key).value = value;
    } else {
      this._datas.push({
        key,
        value,
      });
    }
  }

  has(key) {
    return !!this[getObj](key);
  }

  get(key) {
    const item = this[getObj](key);

    if (item) {
      return item.value;
    }
  }

  get size() {
    return this._datas.length;
  }

  delete(key) {
    for (let i = 0; i < this._datas.length; i++) {
      if (this[isEqual](this._datas[i].key, key)) {
        this._datas.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  clear() {
    this._datas.length = 0;
  }

  /**
   * 判断两个数据是否相等
   * @param {any} data1
   * @param {any} data2
   * @returns
   */
  [isEqual](data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }

    return Object.is(data1, data2);
  }

  /**
   * 通过传入的键名获取数组中对应键名的对象
   * @param {any} key
   */
  [getObj](key) {
    for (const item of this._datas) {
      if (item.key === key) {
        return item;
      }
    }
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield [item.key, item.value];
    }
  }

  forEach(callback) {
    for (const item of this._datas) {
      callback(item.key, item.value, this);
    }
  }
}
