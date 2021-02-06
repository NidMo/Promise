console.log(foo1); // [Function: foo1]
foo1(); // foo1
console.log(foo2); // undefined
foo2(); // TypeError: foo2 is not a function
function foo1 () {
    console.log("foo1");
};
var foo2 = function () {
    console.log("foo2");
};