const fs = require('fs')
const file = fs.readFileSync('input.txt').toString('utf8')

const positions = file.split(',').map(str => parseInt(str)) // convert data into number and array format

// solution below only works if lowest position is 0
console.assert(Math.min(...positions) === 0, "Solution only works if min(input) == 0")

// get fuel costs based on distance (part 1 & part 2)
const constantCostOfMovement = (distance) => distance
const progressiveCostOfMovement = (distance) => (distance * (distance + 1)) / 2

const costsOfMovingToPosition = (costEstimator) => [...Array(Math.max(...positions)).keys()]
    .map(target => positions
        .map(current => costEstimator(Math.abs(current - target)))
        .reduce((a, b) => a + b, 0))

console.log('Part 1 =', Math.min(...costsOfMovingToPosition(constantCostOfMovement)))
console.log('Part 2 =', Math.min(...costsOfMovingToPosition(progressiveCostOfMovement)))