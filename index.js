// 1. index.js 进行原生的Promise演示
// 2. promise.js 进行自定义的Promise演示
// 3. test.js 是对promise.js进行测试
// 4.开发过程结合Promise/A+规范

/**
 * 
 * @param {number} value 
 */
const fn = (value) => {
    return new Promise((resolve,reject) => {
        console.log("promise开始了");
        setTimeout(() => {
            if(value === 1){
                resolve("成功")
            }else{
                reject("失败")
            }
        })
    })
}

fn(1).then((value) => {
    console.log("value:",value);
}).catch((reason) => {
    console.log("reason:",reason);
})
console.log(fn);