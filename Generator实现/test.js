let arr = [1,2,3,4,5]
let iteratorA = arr[Symbol.iterator]()
console.log(iteratorA.next())
console.log(iteratorA.next())
console.log(iteratorA.next("aaa"))
console.log(iteratorA.next())
console.log(iteratorA.next())
console.log(iteratorA.next())

function * a() {
    yield 1
    let temp = yield 2
    console.log("temp:",temp)
    yield 3
    yield 4
    yield 5
}

let gen = a()
console.log(gen.next())
console.log(gen.next())
console.log(gen.next("bbbbbbbb"))
console.log(gen.next())
console.log(gen.next())
console.log(gen.next())