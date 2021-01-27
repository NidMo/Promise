//极简的实现+链式调用+延迟机制
class Promise {
    callbacks = [];
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled);
        return this;
    }
    _resolve(value) {
        setTimeout(() => {//看这里
            this.callbacks.forEach(fn => fn(value));
        });
    }
}

let p = new Promise(resolve => {
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});