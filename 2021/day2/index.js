const fs = require('fs')
const file = fs.readFileSync('input.txt', 'utf8')

const commands = file
  .split('\n')
  .map(line => line.split(' '))
  .map(([direction, units]) => ({
    direction,
    units: parseInt(units)
  }))

const partOne = (commands) => {
  let horizontal = 0
  let depth = 0
  for (const command of commands) {
    switch (command.direction) {
      case 'forward':
        horizontal += command.units;
        break;
      case 'down':
        depth += command.units;
        break;
      case 'up':
        depth -= command.units;
        break;
    }
  }
  return horizontal * depth;
}

const partTwo = (commands) => {
  let horizontal = 0
  let depth = 0
  let aim = 0
  for (const command of commands) {
    switch (command.direction) {
      case 'forward':
        horizontal += command.units;
        depth += aim * command.units;
        break;
      case 'down':
        aim += command.units;
        break;
      case 'up':
        aim -= command.units;
        break;
    }
  }
  return horizontal * depth;
}

console.log('Part 1 =', partOne(commands))
console.log('Part 2 =', partTwo(commands))