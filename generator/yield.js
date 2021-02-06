function* g1() {
    yield 2;
    yield 3;
    yield 4;
  }
  
  function* g2() {
    yield 1;
    yield* g1(); // g1() yield 出去的每个值都会在 g2() 的 next() 方法中返回，就像那些 yield 语句是写在 g2() 里一样。
    yield 5;
  }
  
  var iterator = g2();
  
  console.log(iterator.next()); // { value: 1, done: false }
  console.log(iterator.next()); // { value: 2, done: false }
  console.log(iterator.next()); // { value: 3, done: false }
  console.log(iterator.next()); // { value: 4, done: false }
  console.log(iterator.next()); // { value: 5, done: false }
  console.log(iterator.next()); // { value: undefined, done: true }
