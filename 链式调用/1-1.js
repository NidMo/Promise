// 完整的实现
class Promise {
    callbacks = [];
    state = 'pending';//增加状态
    value = null;//保存结果
    constructor(fn) {
        fn(this._resolve.bind(this));
    }
    then(onFulfilled) {
        return new Promise(resolve => {
            this._handle({
                onFulfilled: onFulfilled || null,
                resolve: resolve
            });
        });
    }
    /**
     * 处理callback
     * @param {*} callback 
     * @description 执行当前Promise对象的回调
     * @description 执行下一个Promise对象的resolve
     */
    _handle(callback) {
        if (this.state === 'pending') {
            this.callbacks.push(callback);
            return;
        }
        //如果then中没有传递任何东西
        if (!callback.onFulfilled) {
            callback.resolve(this.value);
            return;
        }
        var ret = callback.onFulfilled(this.value);
        callback.resolve(ret);
    }
    _resolve(value) {
        this.state = 'fulfilled';//改变状态
        this.value = value;//保存结果
        this.callbacks.forEach(callback => this._handle(callback));
    }
}

let p = new Promise(resolve => {
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
    return "这是then1的返回res"
}).then(tip => {
    console.log('then2', tip);
});

setTimeout(() => {
    p.then(tip => {
        console.log('then3', tip);
    })
}, 1000)