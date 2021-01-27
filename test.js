// 1. index.js 进行原生的Promise演示
// 2. promise.js 进行自定义的Promise演示
// 3. test.js 是对promise.js进行测试
// 4.开发过程结合Promise/A+规范

// console.log("1");

// setTimeout(() => {
//     console.log("1 set time");
// }, 3000)

// setTimeout(() => {
//     console.log("2 set time");
// },2999)

// console.log("end");

// const num = Number("")
// console.log("isNaN():",isNaN(num)); 

// console.log("Number.isNaN:",Number.isNaN(num)); 
const MyPromise = require("./promise")

const a = new MyPromise((resolve, reject) => {
    console.log("aaaaa");
    resolve(1)
}).then(() => {
    
})