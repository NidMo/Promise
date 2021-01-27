const fs = require("fs");

// 发布订阅
// 订阅就是收集依赖
// 发布触发依赖
let events = {
    callbacks: [],
    on(fn){
        this.callbacks.push(fn)
    },
    emit(){
        this.callbacks.forEach(fn => fn())
    }
}
let res = {}

events.on(() => {
    console.log("读取到数据");
})

events.on(() =>{
    if(Object.keys(res).length === 2){
        console.log("读取完毕:",res);
    }
})

fs.readFile("../abc.txt","utf8", (err, data) => {
    res.file1 = data
    events.emit()
})
fs.readFile("../efg.txt","utf8",(err,data) =>{
    res.file2 = data
    events.emit()
})