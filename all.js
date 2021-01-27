// Promise.all

const fs = require("fs"); // fs是node中的 file system

// 有异步的api

// node中异步方法都有回调
// 并发 同时去读取文件，读取完毕的时机不一样

// 并发操作就是两个操作互不影响

let res = {}
function after(fn, times = 1){ // 高阶函数
    return function () {
        if(--times === 0){
            fn()
        }
    }
}
function outputFile(){
    console.log("文本内容:",res);
}
let out = after(outputFile,2)

fs.readFile("./abc.txt","utf8", (err, data) => {
    res.file1 = data
    out()
})
fs.readFile("./efg.txt","utf8",(err,data) =>{
    res.file2 = data
    out()
})