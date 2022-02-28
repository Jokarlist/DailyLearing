// 索引控制模块
((root) => {
  class Index {
    constructor(len, index = 0) {
      // 当前索引值，默认的起始索引值为0
      this.index = index;

      // 需要索引管理的数据的数量，用于做边界判断
      this.len = len;
    }

    /**
     * 获取上一个索引值
     */
    prev() {
      return this.get(-1);
    }

    /**
     * 获取下一个索引值
     */
    next() {
      return this.get(1);
    }

    /**
     * 用来获取索引值
     * @param {number} val 值为1或-1
     */
    get(val) {
      return this.index = (this.index + val + this.len) % this.len;
    }
  }

  root.indexControler = Index;
})(window.player || (window.player = {}));
