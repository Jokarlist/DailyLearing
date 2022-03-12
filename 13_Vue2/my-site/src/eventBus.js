// const listeners = {};

// export const eventBus = {
//   /**
//    * 往事件总线中加入监听某个事件的一个事件处理函数
//    * @param {string} eventName 事件名
//    * @param {function} handler 事件处理函数
//    */
//   $on(eventName, handler) {
//     if (!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }

//     listeners[eventName].add(handler);
//   },

//   /**
//    * 从事件总线中移除监听某个事件的一个事件处理函数
//    * @param {string} eventName
//    * @param {function} handler
//    */
//   $off(eventName, handler) {
//     if (!listeners[eventName]) {
//       return;
//     }

//     listeners[eventName].delete(handler);
//   },

//   /**
//    * 往事件总线中的某个事件的全部事件处理函数抛出事件即其它参数
//    * @param {string} eventName
//    * @param  {...any} args 触发事件时传递的参数
//    */
//   $emit(eventName, ...args) {
//     if (!listeners[eventName]) {
//       return;
//     }

//     for (const handler of listeners[eventName]) {
//       handler(...args);
//     }
//   },
// };

import Vue from "vue";

/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数：滚动的dom元素
 *
 * 事件名：setMainScroll
 * 含义；设置主区域滚动条位置时触发
 * 参数：设置的高度
 */
const vm = new Vue({});

Vue.prototype.$bus = vm;

export default vm;
