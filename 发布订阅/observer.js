// 发布订阅模式   发布者和订阅者，没有任何联系，不存在耦合
// 观察者模式

class Subject {
    constructor(name) {
        this.name = name
        this.state = "ememem"
        this.observers = []
    }
    setState(state) {
        this.state = state
        this.trigger()
    }
    /**
     * 订阅/观察 （收集依赖）
     * @param {*} observer 
     */
    subscribe(observer){
        this.observers.push(observer)
    }
    /**
     * 触发
     */
    trigger(){
        this.observers.forEach(observer => {
            observer.update(this)
        })
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }
    update(sub) {
        console.log(this.name + "收到通知了" + "sub发送变化了:" + sub.state);
    }
}

let sub = new Subject("Person A")
let ob1 = new Observer("ob 甲")
let ob2 = new Observer("ob 乙")
sub.subscribe(ob1)
sub.subscribe(ob2)
sub.setState("aaaaaaaaa")