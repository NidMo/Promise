Promise.resolve()
  .then(() => {
    console.log("microtask 1");
    Promise.resolve()
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

Promise.resolve().then(() => {
  console.log("microtask 2");
});

console.log("sync code");
setTimeout(() => {
  console.log("macro task 1");
  Promise.resolve().then(() => {
    console.log("microtask 3");
  });
}, 0);
setTimeout(() => {
  console.log("macro task 2");
}, 0);
// window.requestAnimationFrame(() => {
//     console.log("执行raf");
// })

//结果：
//sync code 同步代码优先执行
//microtask 1  同步代码执行完后，调用栈清空，优先执行 microtask
//microtask 2  同上
//macro task 1  调用栈清空，microtask queue清空，此时可以执行一个位于队首的macro task，执行期间新增一个microtask
//microtask 3  调用栈清空后，由于存在microtask，因此优先执行microtask
//macro task 2  最后执行macro task，清空task queue
