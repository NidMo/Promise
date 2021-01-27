// function sum(total, i) {
//   if (i === 0) {
//     return total;
//   }
//   return sum(total + 1, i - 1);
// }
function sum(total, i) {
    while (i !== 0) {
        console.log("执行");
        i - 1
        total++
    }
    return total
  }

const res = sum(0, 1000000);
console.log(res);


function sum (total, i, cb) {
    if (i === 0) {
      cb(total)
      return
    }
    const block = 1000
    if (i % block === 0) {
      setTimeout(sum, 0, total + 1, i - 1, cb)
    } else {
      sum(total + 1, i - 1, cb)
    }
  }
  
  
  sum(0, 100000, (total) => {
    console.log(total)
  })