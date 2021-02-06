function* g() {
  let count = 0;
  let b = 2;
  yield ++count;
  yield ++count;
  yield ++count;
  yield ++count;
}

let gen = g();
let otherGen = g();
console.log("第一个:", gen.next());
console.log("第二个:", gen.next());
// 每个迭代器之间互不干扰，作用域独立。
console.log("other gen:", otherGen.next());

console.log("第三个:", gen.next());
console.log("第四个:", gen.next());
console.log("第五个:", gen.next(6666));
console.log("第六个:", gen.next());

function* abc(x) {
  let y = 6;
  y = yield x + 2; // 由于yield永远返回undefined
  return y; // 所以y还是undefined，如果next(x) 传入参数x , 则y = 参数x。
}
// next方法的参数每次覆盖的一定是undefined

let abcg = abc(1);
console.log(abcg.next()); // { value: 3, done: false }
console.log(abcg.next()); // { value: undefined, done: true }
