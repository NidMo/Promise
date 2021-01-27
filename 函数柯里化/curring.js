// 如何实现函数柯里化

const add = (a, b, c, d, e) => {
    console.log("执行");
    return a + b + c + d + e
};

/**
 * 
 * @param {Function} fn 
 */
const curring = (fn, arr = []) => {
    let len = fn.length // 长度指代的是函数的参数个数
    return (...args) => { // 保存用户传入的参数
        arr = arr.concat(args) // [1]
        if(arr.length < len){ // 通过传递的参数，不停的判断是否达到函数执行的参数个数
            return curring(fn, arr)
        }
        return fn(...arr) // 满足函数参数个数，执行函数
    }
}

function checkType(type, content){
    return Object.prototype.toString.call(content) === `[object ${type}]`
}

let util = {};
["Number", "String", "Boolean"].forEach(item => {
    util["is"+item] = curring(checkType)(item)
})
console.log(curring(add)(1)(2,3)(4,5)) 
let r = util.isString("hello")
let b = util.isBoolean(true)
console.log(r,b);

// 函数反柯里化 (是让一个函数的范围变大)