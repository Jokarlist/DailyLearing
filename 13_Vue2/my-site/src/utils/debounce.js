/**
 * 将一个函数设置为防抖函数
 * @param {function} func 原函数
 * @param {number} duration 防抖时长
 */
export default function (func, duration = 100) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, duration);
  };
}
