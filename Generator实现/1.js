// generator的底层原理不是用闭包的。而是用一个全局变量
// context对象用于存储函数执行上下文
var context = {
  next: 0,
  prev: 0,
  done: false,
  stop: function stop() {
    this.done = true;
  },
};

function gen$(context) {
  while (1) {
    switch ((context.prev = context.next)) {
      case 0:
        context.next = 2;
        return "result1";

      case 2:
        context.next = 4;
        return "result2";

      case 4:
        context.next = 6;
        return "result3";

      case 6:
        context.stop();
        return undefined;
    }
  }
}

let foo = function () {
  return {
    next: function () {
      value = gen$(context);
      done = context.done;
      return {
        value,
        done,
      };
    },
  };
};
