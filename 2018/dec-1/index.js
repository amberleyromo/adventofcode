const input = require("fs")
  .readFileSync("input.txt", "utf-8")
  .split(/\n/g);

const calibrate = input =>
  input.reduce((acc, variance) => acc + parseInt(variance), 0);

console.log(calibrate(input));
