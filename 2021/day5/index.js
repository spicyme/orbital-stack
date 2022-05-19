const fs = require('fs')
const inputs = fs.readFileSync('input.txt', 'utf8').split('\n').slice(0, -1).map(line => line.replace(' -> ', ',').split(',').map(n => Number(n)))
const board = []

const size = 1000
for (let x = 0; x < size; x++) {
    board[x] = []
    for (let y = 0; y < size; y++) {
        board[x][y] = 0
    }
}

// Part 1
const inputs1 = [...inputs]
let part1Count = 0

while (inputs1.length) {
    let [x1, y1, x2, y2] = inputs1.shift()

    if (x1 != x2 && y1 != y2) continue // diagonal

    if (x1 > x2) [x1, x2] = [x2, x1]
    if (y1 > y2) [y1, y2] = [y2, y1]

    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            if (board[y][x] == 1) part1Count++
            board[y][x]++
        }
    }
}


// Clear board
for (row of board) {
    for (let i = 0; i < row.length; i++) {
        row[i] = 0
    }
}

// Part 2
let part2Count = 0

while (inputs.length) {
    let [x1, y1, x2, y2] = inputs.shift()


    if (x1 != x2 && y1 != y2) { // diagonal
        let yDir = y2 > y1 ? 1 : -1

        if (x2 > x1) {
            for (let x = x1; x <= x2; x++) {
                const y = y1 + (x - x1) * yDir
                if (board[y][x] == 1) part2Count++
                board[y][x]++
            }
        } else {
            for (let x = x1; x >= x2; x--) {
                const y = y1 + (x1 - x) * yDir
                if (board[y][x] == 1) part2Count++
                board[y][x]++
            }
        }
    } else {
        if (x1 > x2) [x1, x2] = [x2, x1]
        if (y1 > y2) [y1, y2] = [y2, y1]

        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                if (board[y][x] == 1) part2Count++
                board[y][x]++
            }
        }
    }
}

console.log(`Part 1: ${part1Count}`);
console.log(`Part 2: ${part2Count}`);
