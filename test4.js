// const p1 = new Promise((resolve, reject) => {
//   resolve(1);
//   console.log("aaa");
// });
// console.log(p1)
// setTimeout(() => {
//   console.log("p1:", p1);
//   const p2 = p1.then((res) => {
//     console.log("success:", res);
//     return 2;
//   })
//    p2.then((res) => {
//       console.log("第二个then:", res);
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("哈哈哈哈");
//         }, 1000);
//       });
//     })
//     .then((res) => {
//       console.log("第三个then:", res);
//       return "55555";
//     })
//     .then()
//     .then((res) => {
//       console.log("第5个then:", res);
//     }).then((res) => {
//       console.log("第6个then:", res);
//     });
  
// })

// console.log("同步");

Promise.resolve().then(() =>{
  console.log("执行");
}) 

const p2 = new Promise((resolve, reject) => {
  reject("p2");
});
p2.then((res) => {
  console.log("p2 then:", res);
},(reason) =>{
  console.log("reason:",reason);
}).catch((e) =>{
  console.log("错误:",e);
}).then((res) =>{
  console.log("res:",res);
})

p2.then((res) => {
  console.log("第二个then:", res);
})