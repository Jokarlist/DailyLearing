const isEqual = Symbol();

class MySet {
  constructor(iterable = []) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new Error(`传入的${iterable}参数不是一个可迭代对象`);
    }

    this._datas = [];
    for (const item of iterable) {
      this.add(item);
    }
  }

  get size() {
    return this._datas.length;
  }

  add(data) {
    if (!this.has(data)) {
      this._datas.push(data);
    }
  }

  delete(data) {
    for (let i = 0, len = this._datas.length; i < len; i++) {
      if (this[isEqual](this._datas[i], data)) {
        this._datas.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  has(data) {
    for (const item of this._datas) {
      if (this[isEqual](item, data)) {
        return true;
      }
    }

    return false;
  }

  [isEqual](data1, data2) {
    if (data1 === 0 && data2 === 0) {
      return true;
    }

    return Object.is(data1, data2);
  }

  *[Symbol.iterator]() {
    for (const item of this._datas) {
      yield item;
    }
  }

  forEach(callback) {
    for (const item of this._datas) {
      callback(item, item, this);
    }
  }

  clear() {
    this._datas.length = 0;
  }
}
