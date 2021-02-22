var x = 2; // 会提升到函数作用域顶部(浏览器环境下会挂载到window下，node环境没有window，只有global) node运行代码，整个代码就变成一个函数体内运行
var y = {
  x: 3,
  z: (function (x) {
    this.x *= x;
    x += 2;  // 形参x (形成闭包变量)
    return function (n) {
      this.x *= n; 
      console.log("this:",this.x)
      x += 3; 
      console.log(x);
    };
  })(x), // 自执行函数
};
var m = y.z;

m(4);

y.z(5);
console.log(x, y.x);  // (2, 15) node环境  |  (16, 15) 浏览器环境
