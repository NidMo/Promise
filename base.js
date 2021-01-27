// 什么是promise ， 解决那些问题 (基于回调)
// 1.回调地狱 (代码不好维护，错误处理麻烦，不能统一处理)
// 2.多个请求的并发问题

// Promise 是一个类 类只需要用的时候new 一下

// 在new Promise 是需要传递一个执行器函数(executor),这个函数默认就会被立即执行
// 每个promise 都有三个状态 pending fulfilled rejected
// 默认创建一个promise 是 pending
// 每个promise实例都具备一个then方法,then方法中传递两个参数：1.成功的回调 onFulfilled  2.失败的回调 onRejected
// 如何让promise变成失败态？ reject() / 可以抛出一个错误
// 如果多次调用成功或失败，只会执行一次

// 1.实现基本的promise

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    this.status = PENDING; // 默认状态
    this.value = undefined;
    this.reason = undefined;
    this.onResolveCallbacks = []; // 存放成功时的回调
    this.onRejectedCallbacks = []; // 存放失败时的回调
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn())
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    };
    // executor 执行的时候，需要传入两个参数，给用户来改变状态
    try {
      console.log("执行器");
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
        // 订阅
        this.onResolveCallbacks.push(() => {
            onFulfilled(this.value)
        })
        // 订阅
        this.onRejectedCallbacks.push(() => {
            onRejected(this.reason)
        })
    }
  }
}

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("success")
    },1500) 
}).then(
  (value) => {
      console.log("success:",value);
  },
  (e) => {
      console.log("fail:",e);
  }
);
