new Promise((resolve) => {
  setTimeout(() => {
    console.log("ma1");
    resolve();
  }, 0);
}).then(() => {
  console.log("mi1");
});

new Promise((resolve) => {
  setTimeout(() => {
    console.log("ma2");
    resolve();
  }, 0);
}).then(() => {
  console.log("mi2");
});

