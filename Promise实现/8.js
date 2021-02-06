// 1.Promise状态
// 2.then函数

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class MyPromise {
  //静态的resolve方法
  static resolve(value) {
    if (value instanceof MyPromise) return value; // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise((resolve) => resolve(value));
  }
  //静态的reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledQueue = [];
    this.onRejectedQueue = [];
    let resolve = (value) => {
      const run = () => {
        if (this.status !== PENDING) return;
        this.status = FULFILLED;
        this.value = value;
        while (this.onFulfilledQueue.length) {
          const callback = this.onFulfilledQueue.shift();
          callback(value);
        }
      };
      queueMicrotask(run);
    };
    let reject = (reason) => {
      const run = () => {
        if (this.status !== PENDING) return;
        this.status = REJECTED;
        this.reason = reason;
        while (this.onRejectedQueue.length) {
          const callback = this.onRejectedQueue.shift();
          callback(reason);
        }
      };
      queueMicrotask(() => run());
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  /**
   *
   * @param {*} onFulfilled
   * @param {*} onRejected
   */
  then(onFulfilled, onRejected) {
    // 判断参数类型
    typeof onFulfilled !== "function" ? (onFulfilled = (value) => value) : null;
    typeof onRejected !== "function"
      ? (onRejected = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;
    return new MyPromise((resolve, reject) => {
      // 将下一个Promise的resolve/reject塞进当前Promise的异步回调函数中.
      // 执行当前Promise的异步回调时，将返回的值x，传入下一个Promise的resolve/rejct中
      let _onFulfilled = (value) => {
        try {
          let x = onFulfilled(value);
          // 判断当前Promise回调函数返回值x是不是Promise对象
          // 若x是Promise，则 x 这个Promise对象的异步回调改为下一个Promise对象的 resolve/reject ，从而 x 状态改变触发下一个Promise的状态改变
          // 若x是普通值,则执行下一个Promise的resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };
      let _onRejected = (value) => {
        try {
          let x = onRejected(value);
          // 判断当前Promise回调函数返回值x是不是Promise对象
          // 若x是Promise，则 x 这个Promise对象的异步回调改为下一个Promise对象的 resolve/reject ，从而 x 状态改变触发下一个Promise的状态改变
          // 若x是普通值,则执行下一个Promise的resolve
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };
      switch (this.status) {
        case PENDING:
          this.onFulfilledQueue.push(_onFulfilled);
          this.onRejectedQueue.push(_onRejected);
          break;
        case FULFILLED:
          _onFulfilled(this.value);
          break;
        case REJECTED:
          _onRejected(this.reason);
          break;
      }
    });
  }
  /**
   * 捕捉错误
   * @param {*} onRejected
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  //finally方法
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value), // MyPromise.resolve执行回调,并在then中return结果传递给后面的Promise
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        }) // reject同理
    );
  }
}

MyPromise.reject(999).then((res) => {
    console.log("res:",res);
},(reason) =>{
    console.log("错误：",reason);
})