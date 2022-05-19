const fs = require('fs')
const inputs = fs.readFileSync('input.txt', 'utf8').split('\n').slice(0, -1).map(line => line.split(' | ').map(list => list.split(' ').map(dis => dis.split('').sort().join(''))))

// Part 1
let part1Answer = 0
inputs.forEach(([ins, outs]) => {
    outs.forEach(out => {
        const len = out.length
        if (len == 2 || len == 3 || len == 4 || len == 7) {
            part1Answer++
        }
    })
})

/* Segment lengths:
  0 => 6
  1 => 2
  2 => 5
  3 => 5
  4 => 4
  5 => 5
  6 => 6
  7 => 3
  8 => 7
  9 => 6
*/

// Part 2
let part2Answer = 0
inputs.forEach(([ins, outs]) => {
    let one, seven, four, eight

    // get segment nr 1, 4, 7, 8
    ins.forEach(el => {
        if (el.length == 2) one = el
        if (el.length == 3) seven = el
        if (el.length == 4) four = el
        if (el.length == 7) eight = el
    })

    // l part of number 4
    const l = four.split('').filter(seg => !one.includes(seg))

    let zero, six, nine, two, three, five
    ins.forEach(el => {
        if (el.length == 6) {
            if (!one.split('').every(seg => el.includes(seg))) {
                six = el
            } else if (!l.every(seg => el.includes(seg))) {
                zero = el
            } else {
                nine = el
            }
        }

        if (el.length == 5) {
            if (l.every(seg => el.includes(seg))) {
                five = el
            } else if (one.split('').every(seg => el.includes(seg))) {
                three = el
            } else {
                two = el
            }
        }
    })

    let mul = 1000
    outs.forEach(out => {
        switch (out) {
            case zero: part2Answer += 0 * mul; break;
            case one: part2Answer += 1 * mul; break;
            case two: part2Answer += 2 * mul; break;
            case three: part2Answer += 3 * mul; break;
            case four: part2Answer += 4 * mul; break;
            case five: part2Answer += 5 * mul; break;
            case six: part2Answer += 6 * mul; break;
            case seven: part2Answer += 7 * mul; break;
            case eight: part2Answer += 8 * mul; break;
            case nine: part2Answer += 9 * mul; break;
            default: console.log('Unreachable', out, outs);
        }

        mul /= 10
    })
})

console.log(`Answer 1: ${part1Answer}`);
console.log(`Answer 2: ${part2Answer}`);
