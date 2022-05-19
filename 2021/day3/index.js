const fs = require('fs')
const file = fs.readFileSync('input.txt', 'utf8')
const inputs = file.split('\n').slice(0, -1).map(n => ({ n, use: true }))

// Part 1
const bits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let gammaRate = 0
let epsilonRate = 0

// count how many of the bit is 1
for (input of inputs) {
  for (let i = 0; i < 12; i++) {
    if (input.n[i] == '1') {
      bits[i]++
    }
  }
}

// assign common bit to gamma and least common bit to epsilon
for (let i = 0; i < 12; i++) {
  if (bits[i] > inputs.length / 2) {
    gammaRate |= 1 << (11 - i)
  } else {
    epsilonRate |= 1 << (11 - i)
  }
}

// Part 2
function getCommon(side) {
  let valids = inputs.length
  let index = 0

  while (valids > 1) {
    let bits = 0

    for (input of inputs) {
      if (input.use && input.n[index] == '1') bits++
    }

    const xor = side ? bits >= valids / 2 : bits < valids / 2
    for (input of inputs) {
      if ((input.n[index] == '1') != xor && input.use) {
        valids--
        input.use = false
      }
    }

    index++
    if (valids == 1) {
      for (input of inputs) {
        if (input.use) {
          return Number('0b' + input.n)
        }
      }
    }
  }
}


const oxygen = getCommon(true)
for (input of inputs) input.use = true
const co2 = getCommon(false)

console.log(`Part 1: ${gammaRate * epsilonRate}`);
console.log(`Part 2: ${co2 * oxygen}`);
