function gen() {
  /**
   * 调用次数
   */
  let count = 0;
  /**
   * 结果
   */
  let result = 0;
  const next = () => {
    count++;
    switch (count) {
      case 1:
        result += 10;
        return { value: result, done: false };
      case 2:
        result += 20;
        return { value: result, done: false };
      case 3:
        result += 50;
        return { value: result, done: false };
      default:
        return { value: undefined, done: true };
    }
  };
  return { next };
}

let a = gen()
console.log("第1次执行:",a.next());
console.log("第2次执行:",a.next());
console.log("第3次执行:",a.next());

function* gen2() {
    let result = 0
    yield result += 10;
    yield result += 20;
    yield result += 50;
}

let b = gen2()
console.log("gen2 第1次执行:",b.next());
console.log("gen2 第2次执行:",b.next());
console.log("gen2 第3次执行:",b.next());