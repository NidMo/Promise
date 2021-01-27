// 实现原理
// 说到底，Promise 也还是使用回调函数，只不过是把回调封装在了内部
// 使用上一直通过 then 方法的链式调用，使得多层的回调嵌套看起来变成了同一层的，书写上以及理解上会更直观和简洁一些。

// 一.基础版本
// 极简的实现
class Promise {
    callbacks = [];
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled);
    }
    _resolve(value) {
        this.callbacks.forEach(fn => fn(value));
    }
}

// Promise应用
let p = new Promise(resolve => {
    setTimeout(() => {
        console.log('done');
        resolve('1秒');
    }, 1000);
}).then((tip) => {
    console.log(tip);
})