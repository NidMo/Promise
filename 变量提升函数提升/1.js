var a; //全局作用域
console.log("1:", a); // undefined
a = "a";
var foo = () => {
  //函数作用域
  var a; // 全局变量会被局部作用域中的同名变量覆盖
  console.log("2:", a); // undefined
  a = "a1";
};
foo();
console.log("3:", a);
