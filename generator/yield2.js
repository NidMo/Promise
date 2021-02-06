// yield* 还可以 yield 其它任意的可迭代对象，比如说数组、字符串、arguments 对象等等
function* g3() {
    yield* [1, 2];
    yield* "34";
    yield* arguments;
  }
  
  var iterator = g3(5, 6);
  
  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: "3", done: false }
  console.log(iterator.next()); // { value: "4", done: false }
  console.log(iterator.next()); // { value: 5, done: false }
  console.log(iterator.next()); // { value: 6, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }