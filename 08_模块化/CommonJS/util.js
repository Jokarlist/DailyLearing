module.exports = {
  /**
   * 对一个数组随机排序
   * @param {数组}} arr 
   */
  sortRandom (arr) {
    arr.sort(() => Math.random() - 0.5);
  },

  /**
   * 打印一个扑克牌数组
   * @param {数组} pokers 
   */
  print(pokers) {
    let str = "";

    for (const poker of pokers) {
      str += poker + "   ";
    }

    return str;
  }
}