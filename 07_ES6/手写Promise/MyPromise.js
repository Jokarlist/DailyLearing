/* 记录Promise的三种状态 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * 运行一个微队列任务
 * 把传递的回调放到微队列中
 * @param {Function} callback
 */
function runMicroTask(callback) {
  if (process && process.nextTick) {
    // 兼容node.js环境
    process.nextTick(callback);
  } else if (MutationObserver) {
    // 兼容浏览器环境
    const elem = document.createElement("div");
    const observer = new MutationObserver(callback);

    observer.observe(elem, {
      childList: true,
    });
    elem.innerHTML = 1;
  } else {
    setTimeout(callback, 0);
  }
}

/**
 * 判断一个数据是否是Promise对象
 * @param {any} obj
 */
function isPromise(obj) {
  return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}

class MyPromise {
  /**
   * 创建一个Promise对象
   * @param {Function} executor 任务执行器，立即执行
   */
  constructor(executor) {
    this._state = PENDING;
    this._value = undefined;
    this._handlers = []; // 存放后续处理函数的队列
    try {
      // executor类型不正确时抛出错误，且返回失败的Promise并附上失败原因
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
      console.log(error);
    }
  }

  /**
   * 执行后续处理函数队列
   */
  _runHandlers() {
    if (this._state === PENDING) {
      return;
    } else {
      while (this._handlers[0]) {
        this._runOneHandler(this._handlers[0]);
        this._handlers.shift();
      }
    }
  }

  /**
   * 处理单个后续处理函数
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    // 每个后续处理函数都要加入微队列
    runMicroTask(() => {
      if (state !== this._state) {
        // 状态不一致，不进行后续处理
        return;
      }

      if (typeof executor !== "function") {
        // 处理参数不是函数，即相当于无相关后续处理，状态穿透
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }

      // 有相关处理，分处理无错和处理出错两种状态
      try {
        const result = executor(this._value);

        if (isPromise(result)) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  }

  /**
   * 向后续处理函数队列中添加一个函数
   * @param {Function} executor 添加的后续处理函数
   * @param {Function} state 执行该后续处理函数时的状态
   * @param {Function} resolve 使then返回的Promise成功
   * @param {Function} reject 使then返回的Promise失败
   */
  _pushHandler(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }

  /**
   * Promise A+规范的then
   * @param {Function} onFulfilled
   * @param {Function} onRejected
   * @returns Promise
   */
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandler(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandler(onRejected, REJECTED, resolve, reject);
      this._runHandlers();
    });
  }

  /**
   * 更改任务状态
   * @param {String} newState 新状态
   * @param {any} value 相关数据
   */
  _changeState(newState, value) {
    if (this._state !== PENDING) {
      // 状态已经被更改
      return;
    }

    this._state = newState;
    this._value = value;
    this._runHandlers();
  }

  /**
   * 标记当前任务完成
   * @param {any} data 任务完成的相关数据
   * @returns
   */
  _resolve(data) {
    this._changeState(FULFILLED, data);
  }

  /**
   * 标记当前任务失败
   * @param {any} reason 任务失败的相关数据
   * @returns
   */
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }

  /**
   * 仅处理失败的场景
   * @param {Function} onRejected
   * @returns
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 无论成功还是失败都会执行回调
   * @param {Function} onSettled
   */
  finally(onSettled) {
    return this.then(
      (data) => {
        onSettled();
        return data;
      },
      (reason) => {
        onSettled();
        throw reason;
      }
    );
  }

  /**
   * 返回一个已完成的Promise
   * 特殊情况：
   * 1. 传递的data本身就是ES6的Promise对象
   * 2. 传递的data是PromiseLike（Promise A+），则返回新的Promise对象，状态和其保持一致即可
   * @param {any} data
   */
  static resolve(data) {
    if (data instanceof Promise) {
      return data;
    } else {
      return new MyPromise((resolve, reject) => {
        if (isPromise(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      });
    }
  }

  /**
   * 返回一个失败的Promise
   * @param {any} reason
   * @returns
   */
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * 得到一个Promise，该Promise的状态取决于proms的执行
   * proms是一个迭代器，包含多个Promise
   * 全部Promise成功则返回的Promise成功，数据为所有Promise成功的数据，且顺序是按照传入的顺序排列
   * 只要有任一Promise失败，则返回的Promise失败，原因是第一个失败的Promise的原因
   * @param {iterator} proms 任务组为迭代器，因此应用for-of循环来遍历
   */
  static all(proms) {
    return new MyPromise((resolve, reject) => {
      try {
        const resultArr = []; // 存放各任务结果的数组
        let count = 0; // 用于计算任务的总数
        let fulfilledCount = 0; // 完成的任务数

        for (const p of proms) {
          let i = count;

          count++;
          MyPromise.resolve(p).then((data) => {
            fulfilledCount++;
            resultArr[i] = data;
            fulfilledCount === count && resolve(resultArr);
          }, reject);
        }
        count === 0 && resolve(resultArr); // 传入的任务数组是空数组
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  }

  /**
   * 等待所有的Promise有结果之后，该方法返回的Promise完成
   * 并且按照顺序将所有的结果汇总
   * @param {iterator} proms
   */
  static allSettled(proms) {
    const ps = []; // 存放任务数组中已决的任务的相关数据对象

    for (const p of proms) {
      ps.push(
        MyPromise.resolve(p).then(
          (value) => ({
            status: FULFILLED,
            value,
          }),
          (reason) => ({
            status: REJECTED,
            reason,
          })
        )
      );
    }

    return this.all(ps);
  }
}

const pro1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  });
});

MyPromise.allSettled([pro1, Promise.resolve(2), Promise.resolve(3), 4]).then(
  (data) => {
    console.log(data);
  },
  (reason) => {
    console.log(reason);
  }
);
