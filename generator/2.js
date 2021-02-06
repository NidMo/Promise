function* g() {
    var o = 1;
    var a = yield o++; // yield是不返回值的，所以 var a = undefined
    console.log('a = ' + a);  // 调用gen.next(x) 为上一个yield赋值。则 var a = x
    var b = yield o++;
}
var gen = g();

console.log(gen.next());
console.log('------');
console.log(gen.next(11)); // 为上一个yield赋值