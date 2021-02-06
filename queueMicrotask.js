setTimeout(() => {
  console.log("setTimeout");
}, 0);
queueMicrotask(() => {
  console.log("queueMicrotask");
});