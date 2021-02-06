const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
class MyPromise {
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
        while (this.onFulfilledQueue.length) {
          const callback = this.onRejectedQueue.shift();
          callback(value);
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
          throw new Error(reason);
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
              reject(error)
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
            reject(error)
        }
    };
      switch (this.status) {
        case PENDING:
          this.onFulfilledQueue.push(_onFulfilled);
          this.onRejectedQueue.push(_onRejected);
          break;
        case FULFILLED:
          onFulfilled(this.value);
          break;
        case REJECTED:
          onRejected(this.reason);
          break;
      }
    });
  }
}

MyPromise.resolve()
  .then(() => {
    console.log("microtask 1");
    MyPromise.resolve()
      .then(() => {
        console.log("究竟会在哪执行呢");
        return "";
      })
      .then(() => {
        console.log("哈哈哈哈");
      });
    queueMicrotask(() => {
      console.log("queie micro task");
    });
    console.log("aaaaa");
    return "";
  })
  .then((res) => {
    console.log("microtask 1 then then");
  });

MyPromise.resolve().then(() => {
  console.log("microtask 2");
});

console.log("sync code");
setTimeout(() => {
  console.log("macro task 1");
  MyPromise.resolve().then(() => {
    console.log("microtask 3");
  });
}, 0);
setTimeout(() => {
  console.log("macro task 2");
}, 0);