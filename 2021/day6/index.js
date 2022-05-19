const fs = require('fs')
const file = fs.readFileSync('input.txt').toString('utf8')
const initialTime = file.split(',').map(str => parseInt(str))

const days = 7
const timer = days + 2

// Cache values for family sizes
let familySize = {}

// Given a fish with timer zero and a given period of time,
// how big will its family size be at the end of the period?
const familySizeAtEndOfPeriod = (daysLeft) => {
    if (daysLeft <= 0) return 1
    // if never computed before, compute now!
    if (!familySize[daysLeft]) {
        familySize[daysLeft] =
            familySizeAtEndOfPeriod(daysLeft - days) +
            familySizeAtEndOfPeriod(daysLeft - timer)
    }
    // return cached (or recently-computed) value
    return familySize[daysLeft]
}

// compute the sum of family sizes of fishes with set of initial timers
const numLanternfishAtEndOfPeriod = (initialTime, period) => initialTime
    .map(timer => familySizeAtEndOfPeriod(period - timer))
    .reduce((a, b) => a + b, 0)

console.log('Part 1 =', numLanternfishAtEndOfPeriod(initialTime, 80))
console.log('Part 2 =', numLanternfishAtEndOfPeriod(initialTime, 256))