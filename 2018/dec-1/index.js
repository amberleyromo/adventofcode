const input = require("fs")
  .readFileSync("input.txt", "utf-8")
  .split(/\n/g);

/*
 * part one
 */
const calibrate = input =>
  input.reduce((acc, variance) => acc + parseInt(variance), 0);

console.log(calibrate(input));

/*
 * part two
 */
const duplicate = input => {
  const seen = new Set();
  let sum = 0;

  while (true) {
    for (const current of input) {
      sum += Number(current);
      if (seen.has(sum)) return sum;
      seen.add(sum);
    }
  }
};

console.log(duplicate(input));
