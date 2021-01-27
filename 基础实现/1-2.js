//极简的实现+链式调用
class Promise {
    callbacks = [];
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled);
        return this;//看这里
    }
    _resolve(value) {
        this.callbacks.forEach(fn => fn(value));
    }
}

let p = new Promise(resolve => {
    setTimeout(() => {
        console.log('done');
        resolve('5秒');
    }, 5000);
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});