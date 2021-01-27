// after  在。。。之后
// 我希望我调用某个函数 3 次之后，再去执行
// 使用场景： 异步并发问题！ 我同时发送多个请求，我希望拿到最终的结果

function after(fn, times = 1){ // 高阶函数
    return function () {
        if(--times === 0){
            fn()
        }
    }
}

function say(){
    console.log("say");
}

let newSay = after(say,3)
newSay()
newSay()
newSay()

