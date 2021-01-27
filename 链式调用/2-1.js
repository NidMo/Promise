let promiseCount = 1;
//完整的实现 测试Demo
class Promise {
  callbacks = [];
  name = '';
  state = 'pending';//增加状态
  value = null;//保存结果
  constructor(fn) {
    this.name = `Promse-${promiseCount++}`;
    console.log('[%s]:constructor', this.name);
    fn(this._resolve.bind(this));
  }
  then(onFulfilled) {
    console.log('[%s]:then', this.name);
    // 返回一个新的Promise（下一个Promise）
    return new Promise(resolve => {
      // 调用当前Promise的_handle (执行当前Promise回调，然后执行下一个Promise的resolve)
      this._handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      });
    });
  }
  _handle(callback) {
    console.log('[%s]:_handle', this.name, 'state=', this.state);

    if (this.state === 'pending') {
      this.callbacks.push(callback);
      console.log('[%s]:_handle', this.name, 'callbacks=', this.callbacks);
      return;
    }
    //如果then中没有传递任何东西
    if (!callback.onFulfilled) {
      // 下一个Promise对象的resolve
      callback.resolve(this.value);
      return;
    }
    var ret = callback.onFulfilled(this.value);
    // 下一个Promise对象的resolve
    callback.resolve(ret);
  }
  _resolve(value) {
    console.log('[%s]:_resolve', this.name);
    console.log('[%s]:_resolve', this.name, 'value=', value);

    if (value && (typeof value === 'object' || typeof value === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        then.call(value, this._resolve.bind(this));
        return;
      }
    }

    this.state = 'fulfilled';//改变状态
    this.value = value;//保存结果
    this.callbacks.forEach(callback => this._handle(callback));
  }
}


// let p = new Promise(resolve => {
//   resolve('同步执行');
// }).then(tip => {
//   console.log('then1', tip);
//   return "这是then1的返回res"
// }).then(tip => {
//   console.log('then2', tip);
// });

// setTimeout(() => {
//   p.then(tip => {
//       console.log('then3', tip);
//   })
// }, 1000)
/**
 * 模拟异步请求
 * @param {*} url 
 * @param {*} s 
 * @param {*} callback 
 */
const mockAjax = (url, s, callback) => {
  setTimeout(() => {
    callback(url + '异步请求耗时' + s + '秒');
  }, 1000 * s)
}

new Promise(resolve => {
  mockAjax('getUserId', 1, function (result) {
    console.log("resolve咯")
    resolve(result);
  })
}).then(result => {
  console.log(result);
})