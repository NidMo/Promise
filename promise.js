class MyPromise {
  constructor(executor) {
    // 参数校验

    // 初始化值

    this.status = "Pending"
    /**
     * 终值
     */
    this.value = null
   /**
    * 拒因
    */
    this.reason = null
    const resolve = (value) => {
        // 成功的操作 (状态改变，执行成功的回调)

        // 状态改变，且不可逆
        if(this.status === "Pending"){
            this.status = "Fulfilled"
            this.value = value
        }
    };
    const reject = (reason) =>{
        // 失败的操作 (状态改变，执行失败的回调)

        // 状态改变，且不可逆
        if(this.status === "Pending"){
            this.status = "Rejected"
            this.reason = reason
        }
    };
    const then = () => {
        console.log("then")
    }
    executor(resolve, reject);
  }
}

module.exports = MyPromise
