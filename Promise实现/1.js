class MyPromise {
  // 构造方法接收一个回调
  constructor(executor) {
    this._resolveQueue = []; // then收集的执行成功的回调队列
    this._rejectQueue = []; // then收集的执行失败的回调队列

    // 由于resolve/reject是在executor内部被调用, 因此需要使用箭头函数固定this指向, 否则找不到this._resolveQueue
    let _resolve = (value) => {
      // 从成功队列里取出回调依次执行
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift();
        callback(value);
      }
    };
    // 实现同resolve
    let _reject = (reason) => {
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift();
        callback(reason);
      }
    };
    // new Promise()时立即执行executor,并传入resolve和reject
    executor(_resolve, _reject);
  }

  // then方法,接收一个成功的回调和一个失败的回调，并push进对应队列
  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn);
    this._rejectQueue.push(rejectFn);
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("aaaaaa"), 1000);
}).then(
  (res) => {
    console.log("success:", res);
  },
  (e) => {}
);
