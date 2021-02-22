// gen$(context) 获取IteratorResult的value和done
// context 全局变量，用来记录 gen$() 当前的执行状态
// invoke 返回一个对象包含next方法
function gen$(_context) {
  switch ((_context.prev = _context.next)) {
    case 0:
      _context.next = 2;
      return "a";
    case 2:
      _context.next = 4;
      return "b";
    case 4:
      _context.next = 6;
      return "c";
    case 6:
      _context.next = 8;
      return "d";
    case 8:
    case "end":
      return _context.stop();
  }
}
class Context {
  constructor() {
    this.prev = 0;
    this.next = 0;
    this.done = false;
  }
  stop() {
    this.done = true;
  }
}

function gen() {
  let context = new Context();
  return {
    next: function () {
      let value = context.done ? undefined : gen$(context);
      let done = context.done;
      return {
        value,
        done,
      };
    },
  };
}

let g = gen();
let g2 = gen();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log("g2:", g2.next());
console.log("g2:", g2.next());
console.log(g.next());
