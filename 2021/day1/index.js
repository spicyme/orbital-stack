const fs = require('fs')
const file = fs.readFileSync('input.txt', 'utf8')
const depth = file.split('\n').slice(0, -1).map(n => Number(n))

// Part 1
let totalCountPart1 = 0
for (let i = 1; i < depth.length; i++) {
  const currentMeasurement = depth[i]
  const previousMeasurement = depth[i - 1]

  if (currentMeasurement > previousMeasurement) totalCountPart1++
}

// Part 2
let totalCountPart2 = 0
for (let i = 1; i < depth.length - 2; i++) {
  const currentMeasurement = depth[i] + depth[i + 1] + depth[i + 2]
  const previousMeasurement = depth[i - 1] + depth[i] + depth[i + 1]
  
  if (currentMeasurement > previousMeasurement) totalCountPart2++
}

console.log(`Part 1: ${totalCountPart1} are larger than the previous measurement`);
console.log(`Part 2: ${totalCountPart2} are larger than the previous measurement`);

